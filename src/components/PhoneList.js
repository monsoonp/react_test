import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }
  // map 배열 정의, 추가
  // ex) const a = [1,2,3,4,5];
  // const b = a.map(number => number*2);

  // 데이터 제거
  // ex) const arr = [1,2,3,4,5];
  // array.slice(0,2).concat(array.slice(3,5)) / [1,2,4,5] / 좌 우측 배열을 합침
  // [ ...array.slice(0,2), ...array,slice(3,5)];
  // filter
  // array.filter(num =>  num !== 3); / [1,2,4,5] / 3이 아닌 새 배열
  
  // 데이터 수정
  /*
  const array = [
    { id: 0, text: 'hello', tag: 'a' },
    { id: 1, text: 'world' , tag: 'b' },
    { id: 2, text: 'bye', tag: 'c' }
  ];
  const modifiedArray = array.map(item => item.id === 1
   ? ({ ...item,. text: 'Korea' }) // id 가 일치하면 새 객체를 만들고, 기존의 내용을 집어넣고 원하는 값 덮어쓰기
   : item // 바꿀 필요 없는것들은 그냥 기존 값 사용
*/
  shouldComponentUpdate(nextProps, nextState) { // App리렌더링에 따른 PhoneList리렌더링 막음  / 불변성 지킬 것
    return nextProps.data !== this.props.data;  // 다음에 받아올 data가 현재 data와 다를 배열일 때 true
  }

  render() {
    console.log('render PhoneList');
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map( info => 
        (<PhoneInfo key={info.id} // key 배열의 인덱스값(고유) / 없으면 자동생성 but 업데이트시 비효율적 
          info={info} 
          onRemove={onRemove}
          onUpdate={onUpdate}
        />)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default PhoneInfoList;