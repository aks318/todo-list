import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Table, Input, Button, Tag, Space, InputNumber, Popconfirm, Form, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };



const DisplayTable = (props) => {

    const deleteEntry = (record) =>{
        var con = window.confirm("Are You sure want to delete")
        if(con){
            props.delEntry(record)
        }
    }

    // state = {
    //     searchText: '',
    //     searchedColumn: '',
    //   };
    const [data , setData] = useState()
    const [searchText , setsearchText] = useState('')
    const [searchedColumn , setsearchedColumn] = useState('')

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    useEffect(() =>{
        // console.log(props.data)
        setData(props.data.reduce((acc , curr , index) =>{
            acc.push({key: index ,...curr[0] ,tags : curr[1]} )
            return acc
        } , []))
    } , [props.data])

    const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        title: '',
        description: '',
        status: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        // console.log(newData)
        props.editEntry(newData)
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
        // console.log(newData)
        props.editEntry(newData)
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


   
    
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

//    console.log(data)
    const columns = [
        {
            title: 'Set Date',
            dataIndex: 'set_date',
            key: 'set_date',
            render : text => text.format('YYYY-MM-DD'),
            sorter: (a, b) => new Date(a.set_date) - new Date(b.set_date),

          },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => text,
          ...getColumnSearchProps('title'),
          sorter: (a, b) =>a.title.localeCompare(b.title),
          editable: true,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render: text => text,
          ...getColumnSearchProps('description'),
          sorter: (a, b) =>a.description.localeCompare(b.description),
          editable: true,
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: text => text,
            ...getColumnSearchProps('status'),
            editable: true,
          },

          {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <a
                    onClick={() => save(record.key)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Save
                  </a>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
              );
            },
          },

        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                {/* {console.log(record)} */}
              <a onClick = {() =>deleteEntry(record)}>Delete</a>
            </Space>
          ),
        },
      ];

      const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
    
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });
      
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

           
    return (
        <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    )
}

const mapStateToProps = state =>{
    return{
        data : state.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        editEntry : (newData) => dispatch({type : "EDIT_ENTRY" , payload : newData}),
        delEntry : (record) => dispatch({type : "DELETE_ENTRY" , payload : record})
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(DisplayTable)
