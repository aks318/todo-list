import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
import TagInput from './TagInput';
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
    // number: '${label} is not a valid number!',
  },
  // number: {
  //   range: '${label} must be between ${min} and ${max}',
  // },
};
/* eslint-enable no-template-curly-in-string */

const ToDoFormInput = (props) => {
  const onFinish = (values) => {
    console.log(values)
    console.log(props.tags)
    // console.log(values.user.date.format('YYYY-MM-DD'));
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
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

      <Form.Item name={['user', 'date']} label="Date"
        rules = {[
          {
            required : true,
            message: 'Please select time!'
          }
        ]}
       >
        <DatePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
        <TagInput />
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
    tags : state.tags
  }
}

export default connect(mapStateToProps)(ToDoFormInput)