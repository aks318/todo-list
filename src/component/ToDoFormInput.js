import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, DatePicker ,Select} from 'antd';
import { connect } from 'react-redux';
import TagInput from './TagInput';
import moment from 'moment';


const { Option } = Select;
const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 6,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
 
};
/* eslint-enable no-template-curly-in-string */

const ToDoFormInput = (props) => {
  const onFinish = (values) => {
    console.log(values.user)
    console.log(props.tags)
    values.user.set_date = (moment())
    props.handleData([values.user , props.tags])

    // console.log(values.user.date.format('YYYY-MM-DD'));
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'title']}
        label="Title"
        rules={[
          {
            required: true,
          },
          {
            max : 100 , message: 'Title can contains upto 100 character'
          }
        ]}
        
      >
        <Input />
      </Form.Item>
      
      <Form.Item name={['user', 'description']} label="Description"
        rules={[
          {
            required: true,
          },
          {
            max : 1000 , message: 'Description can contains upto 100 character'
          }
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item name={['user', 'date']} label="Due Date"
        rules = {[
          {
            required : true,
            message: 'Please select time!'
          }
        ]}
       >
        <DatePicker />
      </Form.Item>
      <Form.Item label="Add Tag">
        <TagInput />
      </Form.Item>

      <Form.Item name={['user', 'status']} label="Status" rules={[{ required: true }]}>
          <Select
            placeholder="Select Status Of Your Work"
            allowClear
          >
            <Option value="Open">Open</Option>
            <Option value="Working">Working</Option>
            <Option value="Done">Done</Option>
            <Option value="Overdue">Overdue</Option>
          </Select>
        </Form.Item>
        
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = state =>{
  return{
    tags : state.tags,
    data : state.data
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    handleData : (data) => dispatch({type : 'ADD_DATA' , payload : data})
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(ToDoFormInput)