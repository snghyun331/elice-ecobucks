import moment from 'moment-timezone';

const updateTime = {
  toKST: function (date) {
    // ISO 8601 형식의 한국시간대로 변경 
    const kstDate = moment(date).tz('Asia/Seoul'); 
    return kstDate.format();
  },
  
  toTimestamps: function (preQuery) {
    let updateQuery = {
      ...preQuery._doc,
      createdAt: updateTime.toKST(preQuery.createdAt),
      updatedAt: updateTime.toKST(preQuery.updatedAt), 
    }
    // challenge의 경우 dueDate가 있어서 추가적으로 변경
    if (preQuery.dueDate) {
      updateQuery.dueDate = updateTime.toKST(preQuery.dueDate);
    }
    return updateQuery
  },

  addDays: function (date, days) {
    const kstDate = moment(date).tz('Asia/Seoul');
    kstDate.add(days, 'days');
    return kstDate.format();
  },

  addMinutes: function (date, minutes) {
    const kstDate = moment(date).tz('Asia/Seoul');
    kstDate.add(minutes, 'minutes');
    return kstDate.format();
  },

  // 시간으로 받아서 날짜 차이나는 일수 계산  
  dateComparison: function (date1, date2) {
    // 하루를 밀리초로 변환 (1000ms/s * 60s/min * 60min/hr * 24hr/day)
    const MS_PER_DAY = 1000 * 60 * 60 * 24; 
    // 두 날짜의 차이 절대값
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());
    // 차이를 일수로 변환하고 소수점 이하를 버림
    const diffInDays = Math.floor(diffInMs / MS_PER_DAY);
    
    return diffInDays
  }
}

export { updateTime }


/*  
- timestamp에 한국시간으로 변경 사용 예시
  const Challenge = {
    ...createdChallenge._doc,
    createdAt: updateTime.toKST(createdChallenge.createdAt),
    updatedAt: updateTime.toKST(createdChallenge.updatedAt),
  }
- 7일 더하기
  challenge.updatedAt = updateTime.addDays(challenge.updatedAt, 7); 
*/