import React, { ReactNode, useState } from 'react';
import './index.scss';
interface Iprops {
  items: any[];
  hiddedTh: boolean;
  columns: any[];
}
const DescriptionTable: React.FC<Iprops> = (props) => {
  const {
    hiddedTh = false,
    columns,
    items
  } = props;
  return (
    <div className='jim_description_table_wrap' >
      <table className='jim_description_table'>
        {
          !hiddedTh && (
            <tr>
              {
                columns.map(col => {
                  return (
                    <th key={col.fieldKey} style={col.style}>{col.title}</th>
                  )
                })
              }
            </tr>
          )
        }
        {
          items.map(item => {
            return (
              <tr key={item.key}>
                {
                  columns.map(col => {
                    return (
                      <td key={col.fieldKey} style={col.style}>{item[col.fieldKey]}</td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </table>
    </div>
  )
}
export default DescriptionTable;