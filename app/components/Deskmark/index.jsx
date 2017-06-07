import React from 'react';
import uuid from 'uuid';

import CreateBar from '../CreateBar';
import List from '../List';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';

import './style.less';

export default class Deskmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selectedId: null,
            editing: false
        };

        this.selectItem = this.selectItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    selectItem(id) {
        if (id === this.state.selectedId) {
            return;
        }

        this.setState({
            selectedId: id,
            editing: false
        });
    }

    saveItem(item) {
        let items = this.state.items;

        item.id = uuid.v4();
        item.time = new Date().getTime();
        items = [...items, item];

        this.setState({
            items: items
        });
    }

    createItem() {
        this.setState({
            selectedId: null,
            editing: true,
        });
    }

    deleteItem(id) {
        if (!id) {
            return;
        }

        this.setState({
            items: this.state.items.filter(
                result => result.id !== id
            ),
        });
    }

    editItem(id) {
        this.setState({
            selectedId: id,
            editing: true,
        });
    }

    cancelEdit() {
        this.setState({
            editing: false
        });
    }

    render() {
        const { items, selectedId, editing } = this.state;
        const selected = selectedId && items.find(item => item.id === selectedId);
        const mainPart = editing
            ? (
                <ItemEditor
                    item={selected}
                    onSave={this.saveItem}
                    onCancel={this.cancelEdit}
                />
            )
            : (
                <ItemShowLayer
                    item={selected}
                    onEdit={this.editItem}
                    onDelete={this.deleteItem}
                />
            );

        return (
            <section className="deskmark-component">
                <nav className="navbar navbar-fixed-top navbar-inverse">
                    <a className="navbar-brand" href="#">Deskmark App</a>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 list-group">
                            <CreateBar onClick={this.createItem} />
                            <List
                                items={this.state.items}
                                onSelect={this.selectItem}
                            />
                        </div>
                        {mainPart}
                    </div>
                </div>
            </section>
        );
    }
}