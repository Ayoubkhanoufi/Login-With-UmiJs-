import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Table, Divider, Col, Card, Row, Form, Button, Input, Popconfirm  } from 'antd';

const { Column } = Table;

const onFinish = values => {
  console.log(values);
};

const token = localStorage.getItem('userToken'); 

class index extends React.Component{  
  
    constructor(props){
      super(props);
        this.state = {
         data:[]
        }
    }  

  //Get All laptops
  componentDidMount() {
    axios.get('http://localhost:4000/api/laptops/?token='+token,
    {headers :  
      {'Content-Type': 'application/json',
      'x-Token': token}
    })
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
  }

  //Add new laptop
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('http://localhost:4000/api/laptops/?token='+token, values,
        {headers :  
          {'Content-Type': 'application/json',
          'x-Token': token}
        })
          .then(res => {this.componentDidMount();})
          .catch(function (erreur) {
            console.log(erreur);
          });
      }
    });
  };

  //Delete laptop
  handleDelete(id) {
    console.log('Deleted');
    axios.delete('http://localhost:4000/api/laptops/'+id)
      .then(res => {
        this.componentDidMount();
      })
  }

  /*###################### RENDER ###################"*/ 
  render(){
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: 'This field is required!',
      types: {
        number: 'Not a validate number!',
      },
      number: {
        range: 'Must be between ${min} and ${max}',
      },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
      <Row>
        <Col span={10}>
          <div style={{ background: '', padding: '30px' }}>
            <Card title="Add Laptops" bordered={true}>
              <Col span={18}>
                <Form {...layout} name="nest-messages" onSubmit={this.handleSubmit} onFinish={onFinish} validateMessages={validateMessages}>
                  <Form.Item
                    label="Brand">
                    {getFieldDecorator('brand', {
                      rules: [{ required: true, message: 'Laptop brand', whitespace: true }],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item
                    label="Model">
                    {getFieldDecorator('model', {
                      rules: [{ required: true, message: 'Laptop model', whitespace: true }],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Add
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Card>
          </div>
        </Col>
        <Col span={14}>
          <div style={{ background: '',padding: '30px'}} >
            <Card title="List Laptops" bordered={true} >
              <Table dataSource={this.state.data} rowKey="_id" >
                  <Column title="Brand" dataIndex="brand" key="brand" />
                  <Column title="Model" dataIndex="model" key="model" />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <a href="#" >Update</a>
                        <Divider type="vertical" />
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
                          <a>Delete</a>
                        </Popconfirm>
                      </span>
                    )}
                  />
                </Table>
            </Card>
          </div>
        </Col>
      </Row>
      </div>
    );
  }
};

export default Form.create()(index);


