import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AutoComplete, DataSourceType } from './autoComplete'
interface GswPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
export default { 
  title: 'AutoComplete 自动完成',
  component: AutoComplete,
  id: 'AutoComplete',
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
  // argTypes: { onClick: { action: 'clicked' }, onSelect: { action: 'selected' }, onChange: { action: 'changed' } },
} as ComponentMeta<typeof AutoComplete>


export const ASimpleComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const gsw = ['Stephen Curry', 'Klay Thompson', 'Andrew Wiggins', 'Draymond Green', 'Andre Iguodala']
  const handleFetch = (query: string) => {
    return gsw.filter(name => name.includes(query)).map(name => ({value: name}))
  }
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="输入勇士队球员英文名试试"
    />
  )
}
ASimpleComplete.storyName = '基本的搜索'

export const BCustomComplete = (args) => {
  const gswWithNumber = [
    {value: 'Stephen Curry', number: 30},
    {value: 'Klay Thompson', number: 11},
    {value: 'Andrew Wiggins', number: 22},
    {value: 'Draymond Green', number: 23},
    {value: 'Andre Iguodala', number: 9}
  ] 
  const handleFetch = (query: string) => {
    return gswWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<GswPlayerProps>
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    )
  }
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="输入勇士队球员英文名称，自定义下拉模版"
      renderOption={renderOption}
    />
  )
}
BCustomComplete.storyName = '自定义搜索结果模版'

export const CAjaxComplete = (args) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="输入 Github 用户名试试"
      renderOption={renderOption}
    />
  )
}
CAjaxComplete.storyName = '支持异步搜索'

// storiesOf('第九章：AutoComplete', module)
//   .add('AutoComplete', simpleComplete, {info: {source: false, text: textComplete}})
//   .add('自定义下拉选项', customComplete,  {info: {source: false, text: textCustom}})
//   .add('异步请求Github用户名', ajaxComplete, {info: {source: false, text: textAjax}})