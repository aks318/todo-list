import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import moment from 'moment';

const DisplayTable = (props) => {

    const deleteEntry = (record) =>{
        props.delEntry(record)
    }

   console.log(props.data)
    const columns = [
        {
            title: 'Set Date',
            dataIndex: 'set_date',
            key: 'set_date',
            render : text => text.format('YYYY-MM-DD')
          },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => text,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render: text => text,
        },
        {
          title: 'Due Date',
          dataIndex: 'date',
          key: 'date',
          render : text => text.format('YYYY-MM-DD')
        },
        // {
        //   title: 'Age',
        //   dataIndex: 'age',
        //   key: 'age',
        // },
        // {
        //   title: 'Address',
        //   dataIndex: 'address',
        //   key: 'address',
        // },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
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
