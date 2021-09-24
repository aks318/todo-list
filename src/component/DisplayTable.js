import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Table, Input, Button, Tag, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const DisplayTable = (props) => {

    const deleteEntry = (record) =>{
        props.delEntry(record)
    }

    // state = {
    //     searchText: '',
    //     searchedColumn: '',
    //   };

    const [searchText , setsearchText] = useState('')
    const [searchedColumn , setsearchedColumn] = useState('')
    
      const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
            //   ref={node => {
            //     this.searchInput = node;
            //   }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              {/* <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                //   this.setState({
                //     searchText: selectedKeys[0],
                //     searchedColumn: dataIndex,
                //   });
                setsearchText(selectedKeys[0])
                setsearchedColumn(dataIndex)
                }}
              >
                Filter
              </Button> */}
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            // setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // this.setState({
        //   searchText: selectedKeys[0],
        //   searchedColumn: dataIndex,
        // });

        setsearchText(selectedKeys[0])
        setsearchedColumn(dataIndex)
      };
    
      const handleReset = clearFilters => {
        clearFilters();
        // this.setState({ searchText: '' });
        setsearchText('')
      };

   console.log(props.data)
    const columns = [
        {
            title: 'Set Date',
            dataIndex: 'set_date',
            key: 'set_date',
            render : text => text.format('YYYY-MM-DD'),
            sorter: (a, b) => new Date(a.set_date) - new Date(b.set_date)

          },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => text,
          ...getColumnSearchProps('title'),
          sorter: (a, b) =>a.title.localeCompare(b.title),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render: text => text,
          ...getColumnSearchProps('description'),
          sorter: (a, b) =>a.description.localeCompare(b.description),
        },
        {
          title: 'Due Date',
          dataIndex: 'date',
          key: 'date',
          render : text => text.format('YYYY-MM-DD'),
          sorter: (a, b) => new Date(a.date) - new Date(b.date)
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          ...getColumnSearchProps('tags'),

          render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                {console.log(record)}
              <a onClick = {() =>deleteEntry(record)}>Delete</a>
            </Space>
          ),
        },
      ];
      
    //   const data = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       tags: ['nice', 'developer'],
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //       address: 'London No. 1 Lake Park',
    //       tags: ['loser'],
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       tags: ['cool', 'teacher'],
    //     },
    //   ];

      const data = props.data.reduce((acc , curr , index) =>{
          acc.push({key: index ,...curr[0] ,  set_date : moment() ,tags : curr[1]} )
          return acc
      } , [])      
    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        data : state.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        delEntry : (record) => dispatch({type : "DELETE_ENTRY" , payload : record})
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(DisplayTable)
