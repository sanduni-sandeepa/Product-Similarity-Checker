import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from 'antd';
import './App.css';

const fuzz = require("fuzzball");

function App() {
  const [nameScore, setNameScore] = useState(0);
  const [brandScore, setBrandScore] = useState(0);
  const [nameThreshold, setNameThreshold] = useState<number | null>(75);
  const [brandThreshold, setBrandThreshold] = useState<number | null>(70);
  const [ppname, setPPName] = useState<string | null>('');
  const [ppbrand, setPPBrand] = useState<string | null>('');
  const [spname, setSPName] = useState<string>('');
  const [spbrand, setSPBrand] = useState<string>('');
  const [pass, setPass] = useState<string | boolean>("");

  const onFinishCheckName = (values: any) => {
    setNameScore(fuzz.ratio(values.ppname, values.spname));
  };

  const onFinishCheckBrand = (values: any) => {
    setBrandScore(fuzz.ratio(values.ppbrand, values.spbrand));
  };

  const onfinishCheckProduct = () => {
    if (brandThreshold !== null && nameThreshold !== null) {
      const fuzzScore = fuzz.ratio(ppbrand, spbrand) >= brandThreshold && fuzz.ratio(ppname, spname) > nameThreshold;
      let values1 = { ppname, spname }
      let values2 = { ppbrand, spbrand }
      onFinishCheckName(values1);
      onFinishCheckBrand(values2);
      if (fuzzScore) {
        setPass(true);
      }
      else {
        setPass(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Similarity Checker</h1>
        <h3>Product Pass: {pass ? <span style={{ color: "#36fe5f" }}>Pass</span> : <span style={{ color: "#a60350" }} >Fail</span>} </h3>
        <br />
        <Form.Item
          label="Product Name Threshold"
          name="nameThreshold"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber min={0} max={100} defaultValue={70} value={nameThreshold} onChange={setNameThreshold} />
        </Form.Item>
        <Form.Item
          label="Product Brand Threshold"
          name="brandThreshold"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber min={0} max={100} defaultValue={75} value={brandThreshold} onChange={setBrandThreshold} />
        </Form.Item>
        <div className="score-forms">
          <div>
            <p className="score-matching"><span style={{ fontWeight: 700 }}>Product Name </span>span Matching Score : <span style={{ color: "rgb(52 38 188)" }}>{nameScore}</span></p>
            <p className="score-matching">Matching Result : {((nameScore && nameThreshold !== null) && nameScore > nameThreshold) ? <span style={{ color: "#36fe5f" }}>Pass</span> : <span style={{ color: "#a60350" }} >Fail</span>} </p>

            <Form
              name="basic"
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 1000 }}
              initialValues={{ remember: true }}
              onFinish={onFinishCheckName}
              autoComplete="off"
            >

              <Form.Item
                label="Parent Product Name"
                name="ppname"
                rules={[{ required: true, message: 'Please input Parent Product Name' }]}
              >
                <Input
                  onChange={(e) => {
                    setPPName(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Searching Product Name"
                name="spname"
                rules={[{ required: true, message: 'Please input Searching Product Name' }]}
              >
                <Input
                  onChange={(e) => {
                    setSPName(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" className="button">
                  Check Product Names
                </Button>
              </Form.Item>
            </Form>
          </div>
          <hr style={{ margin: 40 }} />
          <div>
            <p className="score-matching"><span style={{ fontWeight: 700 }}>Product Brand </span> Matching Score : <span style={{ color: "rgb(52 38 188)" }}>{brandScore}</span></p>
            <p className="score-matching">Matching Result : {((brandScore && brandThreshold !== null) && brandScore > brandThreshold) ? <span style={{ color: "#36fe5f" }}>Pass</span> : <span style={{ color: "#a60350" }} >Fail</span>}</p>
            <Form
              color="white"
              name="basic"
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 1000 }}
              initialValues={{ remember: true }}
              onFinish={onFinishCheckBrand}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Parent Product Brand "
                name="ppbrand"
                rules={[{ required: true, message: 'Please input Parent Product Brand' }]}
              >
                <Input
                  onChange={(e) => {
                    setPPBrand(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Searching Product Brand "
                name="spbrand"
                rules={[{ required: true, message: 'Please input Searching Product Brand' }]}
              >
                <Input
                  onChange={(e) => {
                    setSPBrand(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" className="button">
                  Check Brand Names
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="button" style={{ background: "#264583" }} htmlType="submit" onClick={onfinishCheckProduct}>
            Check full product
          </Button>
        </Form.Item>

      </header>
    </div>
  );
}

export default App;
