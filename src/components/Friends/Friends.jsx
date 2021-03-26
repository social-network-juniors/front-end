import React, { useState, useEffect } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Tab, Tabs, TextField } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import FriendItem from './FriendItem';
import Invitations from './Invitations';

import { getFriends } from '../../api/rest/friends';
import axios from 'axios'
export default function Friends() {
    let data = [{ id: 10, name: 'mark' }, { id: 2, name: 'ivan' }];
    const [search, setSearch] = useState('');
    const [friends, setFriends] = useState(data)
    const [tab, setTab] = useState(0);
    // const [filter, setFilter] = useState(null)

    useEffect(() => {
        if (search != '') {
            setFriends([...data.filter((e) => e.name.indexOf(search, 0) === 0)])
        } else { setFriends(data) }
    }, [search])
    useEffect(() => {
        axios.get('/api/friend/get')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const handleTabsMenu = (e, newValue) => {
        setTab(newValue);
        console.log(newValue);
    }
    return (
        <div>
            <TextField label='Найти друга...' value={search} onFocus={() => setTab(0)} onChange={(e) => setSearch(e.target.value)} variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon onClick={() => console.log('')} />
                        </InputAdornment>
                    ),
                }}
            />
            <Tabs value={tab} onChange={handleTabsMenu}>
                <Tab icon={<PeopleIcon />} label="Друзья" />
                <Tab icon={<PersonAddIcon />} label="Заявки" />
            </Tabs>
            {tab === 0 ? <FriendItem friends={friends} /> : <Invitations invites={data} />}

        </div>
    )
}
