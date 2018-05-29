import * as React from 'react'
import { Grid } from 'antd-mobile'
// import 'antd-mobile/lib/grid/style'
import 'antd-mobile/dist/antd-mobile.css'

const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}))

export default class Matrix extends React.Component {
  public render() {
    return (
      <div>
        <Grid data={data1}
          columnNum={3}
          renderItem={(dataItem: {icon: any}) => (
            <div style={{ padding: '12.5px' }}>
              <img src={dataItem.icon} style={{ width: '45px', height: '45px' }} alt="" />
              <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                <span>I am title..</span>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}
