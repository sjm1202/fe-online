import React, { Children, useEffect, useState, useImperativeHandle } from 'react';
import { Tree } from 'antd';
import type { DataNode as InitDataNode, TreeProps } from 'antd/es/tree';
import { DownOutlined, ApartmentOutlined, LoadingOutlined} from '@ant-design/icons';
import orgApi from '@/api/org';
import type { Org } from '@/api/org';
import './style.scss';
interface Iprops {
  onSelect: (path: {key: string;title: string}[]) => void;
}
interface Iref {
  updateOrgUserCount: (path: { key: string }[], count: number) => void
}
type DataNode = InitDataNode & { count?: number}
const OrgTree = React.forwardRef<Iref, Iprops>((props, ref) => {
  const [ treeData, setTreeData ] = useState<DataNode[]>([]);
  const [ selectedKeys, setSelectedKeys ] = useState<React.Key[]>([]);
  const updateOrgUserCount = (path: { key: string }[], count: number) => {
    let list: DataNode[] = treeData;
    for (let i = 0; i < path.length - 1; i++) {
      let curKey = path[i].key;
      list = list.find(item => item.key === curKey)!.children!
    }
    let target = list.find(item => item.key === path[path.length - 1].key)!;
    target.count = count;
    setTreeData([ ...treeData ])
  }
  useImperativeHandle(ref, () => {
    return {
      updateOrgUserCount
    }
  })
  const { onSelect } = props;
  useEffect(() => {
    orgApi.query().then((orgs: Org[]) => {
      let res = orgs.map((item: Org) => {
        return {
          key: item.id,
          title: item.name,
          icon: <ApartmentOutlined />,
        }
      })
      setTreeData(res)
      if (res.length) {
        onSelect([{
          key: res[0].key,
          title: res[0].title,
        }])
        setSelectedKeys([ res[0].key ])
      }
    })
  }, [])
  const updateTreeData = (list: DataNode[], key: string, children: DataNode[]): DataNode[] => {
    return list.map(node => {
      if (node.key === key) {
        return {
          ...node,
          children,
        }
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children)
        }
      }
      return node;
    })
  }
  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>(resolve => {
      if (children) {
        resolve();
        return;
      }
      orgApi.query(key).then((orgs: Org[]) => {
        setTreeData(origin => {
          return updateTreeData(origin, key, orgs.map((item: Org) => {
            return {
              key: item.id,
              title: item.name,
              icon: <ApartmentOutlined />,
            }
          }))
        })
        resolve();
      })
    })
  }

  type pathItem = {
    key: string;
    label: string;
  }
  const calculateTreePath = (list: DataNode[], key: any): any => {
    for (let i = 0; i < list.length; i++) {
      let cur = list[i];
      if (cur.key === key) {
        return [ { key: cur.key, title: cur.title } ];
      }
      if (cur.children) {
        let res = calculateTreePath(cur.children, key)
        if (res) {
          res.unshift({
            key: cur.key, title: cur.title,
          })
          return res;
        }
      }
    }
    return false;
  }
  const handleSelect = (keys: React.Key[]) => {
    if (!keys.length) {
      return
    }
    let path = calculateTreePath(treeData, keys[0])
    onSelect(path)
    setSelectedKeys(keys)
  }
  return (
    <div className='org-tree-wrap'>
      <Tree
        selectedKeys={selectedKeys}
        showIcon={true}
        switcherIcon={<DownOutlined />}
        loadData={onLoadData}
        treeData={treeData}
        titleRender={(val) => {
          return (
            <>
              {val.title}
              {
                val.count !== undefined && (<span style={{marginLeft: '8px'}}>{val.count}</span>)
              }
            </>
          )
        }}
        onSelect={handleSelect}
      />
    </div>
  )
})
export default OrgTree;