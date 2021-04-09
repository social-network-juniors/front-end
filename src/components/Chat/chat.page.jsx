import React, { useState, useEffect } from 'react';

import ChatBody from './ChatBody';
import ChatsMenu from './ChatsMenu';

import { useDispatch, useSelector } from "react-redux";
import { thunksCreators } from "../../redux/reducers/chat.reducer";
import { friendsThunk } from "../../redux/reducers/friends.reducer";


import { getAuthorizationHeader } from '../../services'

import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import LoopIcon from '@material-ui/icons/Loop';
export default function Chat() {
    const isLoading = useSelector(store => store.chat.isLoading);
    const chats = useSelector(store => store.chat.chatsList);
    const foundUsersList = useSelector(store => store.friends.foundUsers);

    const [filteredChats, setFilteredChats] = useState(chats)
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    let tokenHeader = getAuthorizationHeader();

    const getChats = () => {
        dispatch(thunksCreators.getChats(tokenHeader))
    }

    useEffect(() => {
        getChats()
    }, [])

    useEffect(() => {
        if (search != '') {
            dispatch(friendsThunk.searchPeople(tokenHeader, search))
            setFilteredChats([...chats.filter((e) => e.first_name.toUpperCase().indexOf(search.toUpperCase(), 0) === 0 ||
                e.last_name.toUpperCase().indexOf(search.toUpperCase(), 0) === 0
            )])
        } else { setFilteredChats(chats) }

    }, [search])
    return (
        <div>
            {isLoading === true ? <LoopIcon /> : null}
            <TextField label='Поиск' value={search} onChange={(e) => setSearch(e.target.value)} variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <ChatsMenu chats={filteredChats} foundUsers={foundUsersList} />
            <ChatBody />
        </div>
    )
}
