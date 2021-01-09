import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {label: "Going to learn React!! Shiish :)", important: true, like: false, id: 1},
                {label: "How about pizza?", important: false, like: false, id: 2},
                {label: "My first twitt!", important: false, like: false, id: 3}
            ],
            term: ''
        };
        this.deteleItem = this.deteleItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);

        this.maxId = 4;
    }

    deteleItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items 
        }

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        });
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    render() {
        const {data, term} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.searchPost(data, term);

        return (
            <div className="app">
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                    <div className="search-panel d-flex">
                    <SearchPanel
                    OnUpdateSearch={this.OnUpdateSearch}/>
                    <PostStatusFilter/>
                    </div>
                    <PostList
                     posts={visiblePosts}
                     onDelete={this.deteleItem}
                     onToggleImportant={this.onToggleImportant}
                     onToggleLiked={this.onToggleLiked}/>
                    <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}