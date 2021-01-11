import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// import bg01 from "./assets/img_bgshare@2x.png";
// style={{
        
//   // backgroundImage: `url(${bg01})`,
//   // background: `url(${require("./assets/img_bgshare@2x.png")})`
// }}
/**  */
const data = require("./data.json");

class TryToDo extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header />
        <Content />
        <Footer />
      </React.Fragment>
    )
  }
}

/** header 返回按钮，规则显示按钮，文字，图标， */
class Header extends React.Component {

  render () {
    console.log(data)
    return (
      <div className="header">
        <div className="top">
          <div className="return"></div>
          <div className="rules">规则</div>
        </div>
        <div className="bottom">
          <div className="title">
            {data.title}
          </div>
          <div className="subtitle">
            {data.subtitle}
          </div>
        </div>
        <div className="right"></div>
      </div>
    )
  }

}

function timeFormat(createAt){
  const time = new Date(createAt);
  const date01 =  ("0" + (time.getMonth() + 1)).slice(-2) + "-" +
                ("0" + time.getDate()).slice(-2)
  const date02 = ("0" + time.getHours()).slice(-2) + ":" +
                 ("0" + time.getMinutes()).slice(-2)
  return [date01, date02]
}

/** content 商品信息：左图右字，以及多行客户信息：头像+名字+操作+所得 */
class Content extends React.Component {



  render () {
    return (
      <div className="content">
        <div className="content_top">
          <img src={data.orderItem.sku.images[0].full.url} alt=""/>
          <div className="orderItem">
            <p>{data.orderItem.sku.nameCN}</p>
            <p>已买: {data.orderItem.sku.size.name}</p>
            <p>{data.available ? "￥" + data.orderItem.initialUnitFens/100 : "已售罄"}</p>
          </div>
        </div>
        <div className="content_bottom">
          {data.influentialSharingInfos.map((item, index) => {
            return (
              <div className="influentialSharingInfos" key={index}>
                <div className="time">
                  <p>{timeFormat(item.createAt)[0]}</p>
                  <p>{timeFormat(item.createAt)[1]}</p>
                </div>
                <img src={item.avatar} alt=""/>
                <div className="infos">
                  <p className="nickName">{item.nickName}</p>
                  <p className="description">{item.description}</p>
                </div>
                <p className="reward" style={{
                  color: item.reward.color,
                  fontSize: item.reward.fontSize/1000 + "rem",
                  fontWeight: item.reward.fontWeight,
                }}>
                  {item.reward.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

/** footer 在最底部的分享按钮 */
class Footer extends React.Component {

  render () {
    return (
      <div className="footer">
        
      </div>
    )
  }
}


ReactDOM.render(
  <TryToDo />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
