import React, { useContext, useEffect, useState } from 'react';
import app from '../firebase.js';

const DatabaseContext = React.createContext();
const DatabaseContextProvider = DatabaseContext.Provider;

export function useDatabase() {
    return useContext(DatabaseContext);
};

// Usage of Database Functions:
// call the function then couple it with then and catch because they are
// asynchronous

export function DatabaseProvider({ children }) {
    const userDatabase = app.firestore().collection("/users");
    const gameDatabase = app.firestore().collection("/games");
    const fireStorage = app.storage();

    function addEntry(id, data) {
        let entry = {
            id: id,
            ...data
          };
        console.log(entry);
        // userDatabase.push(entry);
    }

    function getEntry(id) {
        let userRef = userDatabase.doc(id);
        return userRef.get();
    }

    function setEntry(id, data) {
        let userRef = userDatabase.doc(id);
        return userRef.set(data);
    }

    function getGameData(id, fieldname) {
        let gameRef = gameDatabase.doc(id);
        return gameRef.get().then((doc) => {
            console.log(doc.data());
            let fieldData = doc.data()[fieldname];
            console.log(fieldData);
            return fieldData;
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    function setGameData(id, fieldname, newData) {
        let gameRef = gameDatabase.doc(id);
        gameRef.get().then((doc) => {
            let gameData = doc.data();
            console.log(gameData);
            gameData[fieldname] = newData;
            console.log(gameData);
            return gameRef.set(gameData);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    function uploadStorage(id, address, file) {
        let storageName = id + address;
        let storageRef = fireStorage.ref(storageName);
        return storageRef.put(file);
    }

    function getFile(id, address) {
        let storageName = id + address;
        return fireStorage.ref(storageName).getDownloadURL();
    }

    const databaseInfo = {
        addEntry,
        setEntry,
        getEntry,
        getGameData,
        setGameData,
        uploadStorage,
        getFile
    };

    return (
        <DatabaseContextProvider value={databaseInfo}>
            {children}
        </DatabaseContextProvider>
    );
};