/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BridgeContext, StoreContext } from '../context';
import InspectedElementTree from './InspectedElementTreeStoreInspector';
import Button from '../Button';
import ButtonIcon from '../ButtonIcon';
import { copy } from 'clipboard-js';
import { serializeDataForCopy } from '../utils';

import styles from './StoreInspector.css';

function Section(props: {| title: string, children: React$Node |}) {
  return (
    <>
      <div className={styles.SectionTitle}>{props.title}</div>
      <div className={styles.SectionContent}>{props.children}</div>
    </>
  );
}

function RecordList({
  records,
  recordsByType,
  selectedRecordID,
  setSelectedRecordID,
}) {
  const [recordSearch, setRecordSearch] = useState('');
  const fetchSearchBarText = useCallback(e => {
    setRecordSearch(e.target.value);
  }, []);
  const [recordListStyles, setRecordListStyles] = useState({});
  const [plusMinusCollapse, setPlusMinusCollapse] = useState({});

  if (records == null || recordsByType == null) {
    return <div>Loading...</div>;
  }

  let recordsArray = Array.from(recordsByType).map((recs, _) => {
    let type = recs[0];
    let ids = recs[1];
    return (
      <div key={type}>
        <div className={styles.Collapse}>
          <button
            key={type}
            onClick={() => {
              if (recordListStyles[type] === 'none') {
                setRecordListStyles({ ...recordListStyles, [type]: 'block' });
                setPlusMinusCollapse({ ...plusMinusCollapse, [type]: '-' });
              } else {
                setRecordListStyles({ ...recordListStyles, [type]: 'none' });
                setPlusMinusCollapse({ ...plusMinusCollapse, [type]: '+' });
              }
            }}
            className={styles.Type}
          >
            {type}
          </button>
          <span className={styles.PlusMinusCollapse}>
            {plusMinusCollapse[type] == null ? '-' : plusMinusCollapse[type]}
          </span>
        </div>
        <div
          className={styles.RecordListContent}
          style={{
            display:
              recordListStyles[type] == null ? 'block' : recordListStyles[type],
          }}
        >
          {ids
            .filter(id =>
              recordSearch
                .trim()
                .split(' ')
                .some(
                  search =>
                    id.toLowerCase().includes(search.toLowerCase()) ||
                    type.toLowerCase().includes(search.toLowerCase())
                )
            )
            .map(id => {
              return (
                <div
                  key={id}
                  onClick={() => {
                    setSelectedRecordID(id);
                  }}
                  className={`${styles.Record} ${
                    id === selectedRecordID ? styles.SelectedRecord : ''
                  }`}
                >
                  {id}
                </div>
              );
            })}
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className={styles.Records}>
      <input
        className={styles.RecordsSearchBar}
        type="text"
        onChange={fetchSearchBarText}
        placeholder="Search"
      ></input>
      {recordsArray.length <= 0 && recordSearch !== '' ? (
        <p className={styles.RecordNotFound}>
          Sorry, no records with the name '{recordSearch}' were found!
        </p>
      ) : (
        recordsArray
      )}
    </div>
  );
}

function RecordDetails({ records, selectedRecord, setSelectedRecordID }) {
  if (selectedRecord == null) {
    return <div className={styles.RecordDetails}>No record selected</div>;
  }

  const { __id, __typename, ...data } = selectedRecord;

  return (
    <div className={styles.RecordDetails}>
      <Section title="ID">{__id}</Section>
      <Section title="Type">{__typename}</Section>
      <InspectedElementTree
        label="Store data"
        data={data}
        records={records}
        setSelectedRecordID={setSelectedRecordID}
        showWhenEmpty
      />
    </div>
  );
}

export default function StoreInspector(props: {|
  +portalContainer: mixed,
  currentEnvID: ?number,
|}) {
  const store = useContext(StoreContext);
  const bridge = useContext(BridgeContext);
  const [, forceUpdate] = useState({});
  const refreshStore = useCallback(() => {
    bridge.send('refreshStore', props.currentEnvID);
  }, [props, bridge]);

  useEffect(() => {
    const onStoreData = () => {
      forceUpdate({});
    };
    store.addListener('storeDataReceived', onStoreData);
    return () => {
      store.removeListener('storeDataReceived', onStoreData);
    };
  }, [store]);

  const [selectedRecordID, setSelectedRecordID] = useState(0);
  let records = {};
  const copyToClipboard = useCallback(() => {
    copy(serializeDataForCopy(records));
  }, [records]);

  if (props.currentEnvID == null) {
    return null;
  }

  records = store.getRecords(props.currentEnvID);
  let selectedRecord = {};
  let recordsByType = new Map();
  if (records != null) {
    for (let key in records) {
      if (records[key] != null) {
        let arr = recordsByType.get(records[key].__typename);
        if (arr) {
          arr.push(key);
        } else {
          recordsByType.set(records[key].__typename, [key]);
        }
      }
    }
    selectedRecord = records[selectedRecordID];
  }

  if (records == null) {
    return null;
  }
  return (
    <div className={styles.StoreInspector}>
      <div className={styles.Toolbar}>
        <button
          className={styles.RefreshButton}
          onClick={refreshStore}
          title="Refresh"
        >
          Refresh
        </button>
        <Button onClick={copyToClipboard} title="Copy to clipboard">
          <ButtonIcon type="copy" />
        </Button>
        <div className={styles.Spacer} />
      </div>
      <div className={styles.Content}>
        <RecordList
          records={records}
          recordsByType={recordsByType}
          selectedRecordID={selectedRecordID}
          setSelectedRecordID={setSelectedRecordID}
        />
        <RecordDetails
          records={records}
          setSelectedRecordID={setSelectedRecordID}
          selectedRecord={selectedRecord}
        />
      </div>
    </div>
  );
}
