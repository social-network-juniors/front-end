import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { friendsThunk } from "../../redux/reducers/friends.reducer";

import FriendsList from './Friends';
import FollowersList from './Followers';
import FollowedList from './Followed';
import FoundUsersList from './FoundUsersList'
import FriendRequests from './FriendRequests'

import { getAuthorizationHeader } from '../../services'

import InputAdornment from '@material-ui/core/InputAdornment';
import { Tab, Tabs, TextField, Menu, MenuItem, Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import LoopIcon from '@material-ui/icons/Loop';
import StarIcon from '@material-ui/icons/Star';


export default function Friends() {


    //redux
    // const store = useSelector(store => store.friends);
    const isLoading = useSelector(store => store.friends.isLoading);
    const friendsList = useSelector(store => store.friends.friends);
    const followersList = useSelector(store => store.friends.followers);
    const followedList = useSelector(store => store.friends.followed);
    const foundUsersList = useSelector(store => store.friends.foundUsers);
    const requestsList = useSelector(store => store.friends.requests);
    console.log(friendsList)
    console.log(followersList)

    const dispatch = useDispatch();
    let tokenHeader = getAuthorizationHeader();

    const getFriends = () => {
        dispatch(friendsThunk.getFriends(tokenHeader))
    }
    const getFollowers = () => {
        dispatch(friendsThunk.getFollowers(tokenHeader))
    }
    const getFollowed = () => {
        dispatch(friendsThunk.getFollowed(tokenHeader))
    }
    const getFoundUsers = (search) => {
        dispatch(friendsThunk.searchPeople(tokenHeader, search))
    }
    const getRequests = () => {
        dispatch(friendsThunk.getRequests(tokenHeader))
    }

    //setFriends
    useEffect(() => {
        getFriends()
        getFollowers()
        getFollowed()
        getRequests()
    }, [])
    useEffect(() => {
        setFriends(friendsList)

    }, [friendsList])


    const [search, setSearch] = useState('');
    const [friends, setFriends] = useState(friendsList);
    // const [followers, setFollowers] = useState(followersList);
    // const [followed, setFollowed] = useState(followedList);
    // const [foundUsers, setFoundUsers] = useState(foundUsersList);

    const [tab, setTab] = useState(0);
    const [filterAnchor, setFilterAnchor] = useState(null);


    useEffect(() => {
        if (search != '') {
            getFoundUsers(search);
            setFriends([...friends.filter((e) => e.first_name.toUpperCase().indexOf(search.toUpperCase(), 0) === 0 ||
                e.last_name.toUpperCase().indexOf(search.toUpperCase(), 0) === 0
            )])
        } else { setFriends(friendsList) }
    }, [search])



    //navs
    const handleTabsMenu = (e, newValue) => {
        setTab(newValue);
    }
    const closeFilterMenu = (type) => {
        setFilterAnchor(null);
        if (type === 'alphabet') {
            let newSort = friendsList.sort(
                (a, b) => {
                    if (a.last_name > b.last_name) return 1;
                    if (a.last_name == b.last_name) return 0;
                    if (a.last_name < b.last_name) return -1;
                }
            );
            setFriends(newSort);
        }
        if (type === 'default') {
            setFriends(friendsList);
        }
    }
    const handleFilter = (event) => {
        setFilterAnchor(event.currentTarget);
    }
    return (
        <div>
            {isLoading === true ? <LoopIcon /> : null}
            <TextField label='Поиск...' value={search} onFocus={() => setTab(0)} onChange={(e) => setSearch(e.target.value)} variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Tabs value={tab} onChange={handleTabsMenu}>
                <Tab icon={<PeopleIcon />} label={'Друзья (' + friends.length + ')'} />
                <Tab icon={<PersonAddIcon />} label={'Подписчики (' + followersList.length + ')'} />
                <Tab icon={<StarIcon />} label={'Подписки (' + followedList.length + ')'} />
                <Tab icon={<PersonAddIcon />} label={'Заявки (' + requestsList.length + ')'} />
            </Tabs>
            { tab === 0 && search === '' && <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleFilter}><SortIcon /></Button>
                <Menu
                    keepMounted
                    anchorEl={filterAnchor}
                    open={Boolean(filterAnchor)}
                    onClose={closeFilterMenu}
                >
                    <MenuItem onClick={() => closeFilterMenu('alphabet')}>По алфавиту</MenuItem>
                    <MenuItem onClick={() => closeFilterMenu('default')}>По умолчанию</MenuItem>
                </Menu>
            </div>}
            {tab === 0 && <FriendsList friends={friends} />}
            {tab === 0 && search !== '' && <FoundUsersList users={foundUsersList} />}
            {tab === 1 && <FollowersList followers={followersList} />}
            {tab === 2 && <FollowedList followed={followedList} />}
            {tab === 3 && <FriendRequests requests={requestsList} />}
        </div >
    )
}
