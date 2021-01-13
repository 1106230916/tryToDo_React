import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ic_wechat_white from "./assets/ic_wechat_white.png"

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
  constructor(props) {
    super(props);
    const rules_show = false;
    this.state = {
      "rules_show": rules_show 
    }
    this.rules_show_Change = this.rules_show_Change.bind(this);
  }

  rules_show_Change(e){
    const rules_show = this.state.rules_show;
    console.log(rules_show);
    this.setState({
      "rules_show": !rules_show
    })
  }

  render () {
    console.log(data);
    const rules_show = this.state.rules_show;
    return (
      <div className="header">
        <div className="top">
          <div className="return"></div>
          <div className="rules" onClick={this.rules_show_Change}>规则</div>
          {rules_show ?
            <div className="rules_show">
              <div className="rules_show_cover" onClick={this.rules_show_Change}></div>
              <div className="rulse_show_top">
                <p>规则</p>
                <div className="rules_show_close" onClick={this.rules_show_Change}></div>  
              </div>
              <div className="rules_show_text">
                <p>分享带货是别样海外购成功下单后进行给好友推荐分享的返利活动，该活动目前还在灰度测试中，仅限部分用户、部分商品参与，相关规则还在调测中，别样海购购拥有最终解释权。</p>
                <p>一、如何获得奖励？</p>
                <p>1. 在订单详情页选择分享自己买过的商品 (部分商品不支持), 点击【分享带货】按钮；
                    <br></br>2. 好友通过你分享的专属链接购买分享的商品，可以获得带货成功的积分奖励；
                    <br></br>3. 如果好友购买的分享商品，是在别样海外购上的首单，你可额外获得一张代金券奖励；
                    <br></br>4. 带货奖励在好友付款成功的7个自然日后（含当日），解冻奖励积分，代金券生效。代金券有效期30个自然日，请及时使用。
                    5. 分享的商品所获的带货奖励都有上限，达到上限将不再奖励；</p>
                <p>二、为什么我没有收到奖励</p>
                <p>你的微信好友需要打开您分享的专属链接并点击商品进行购买，才能帮你得到奖励。若你的好友在购买商品前，在不同人分享的链接中都将该商品加入过购物袋，则只有最后一次加入购物袋的链接能帮分享者得到奖励。
                    如分享的用户与指定好友有一方发生退款，平台将回收未使用的优惠券。
                    分享商品后24小时内微信好友购买才可以帮您获得奖励。
                    分享的商品所获的带货奖励都有上限，达到数量上限之后，即使满足带货条件也无法获得奖励。
                    若使用非正常手段获取活动奖励（包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、批量注册、机器注册账户、用机器模拟客户端等方式），别样海外购有权撤销用户参与本活动的资格，撤销发放活动奖励并关闭相关交易订单，并将视情况对其追究法律责任。</p>
              </div>
            </div> : null}
        </div>
        <div className="bottom">
          <div className="right"></div>
          <div>
            <div className="title">
              {data.title}
            </div>
            <div className="subtitle">
              {data.subtitle}
            </div>
          </div>
          
        </div>
      </div>
    )
  }

}

/** 获取时间戳，分开换算成月份+时间 */
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
          {/** 测试有数据and没有数据的情况 */}
          {/* {data.influentialSharingInfos = null} */}
          {data.influentialSharingInfos !== null ? data.influentialSharingInfos.map((item, index) => {
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
          }) : 
          <div className="influentialSharingInfos_null">
            <div className="null_img"></div>
            <p className="null_text01">还没有带货记录</p>
            <p className="null_text02">去分享给感兴趣的朋友吧</p>
          </div>}
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
        <div className="share_button">
          <img src={ic_wechat_white} alt=""/>
          <p>分享给好友</p>
        </div>
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
