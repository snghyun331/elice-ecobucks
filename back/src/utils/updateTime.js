import moment from 'moment-timezone';
/*  한국시간으로 ISO 8601 형식의 문자열로 반환
- timestamp에 한국시간으로 변경 사용 예시
  const Challenge = {
    ...createdChallenge._doc,
    createdAt: updateTime.toKST(createdChallenge.createdAt),
    updatedAt: updateTime.toKST(createdChallenge.updatedAt),
  }
- 7일 더하기
  challenge.updatedAt = updateTime.addDays(challenge.updatedAt, 7); 
*/
const updateTime = {
  toKST : function (date) {
    // ISO 8601 형식의 한국시간대로 변경 
    const kstDate = moment(date).tz('Asia/Seoul'); 
    return kstDate.format();
  },

  addDays : function (date, days) {
    const kstDate = moment(date).tz('Asia/Seoul');
    kstDate.add(days, 'days');
    return kstDate.format();
  },

  addMinutes: function (date, minutes) {
    const kstDate = moment(date).tz('Asia/Seoul');
    kstDate.add(minutes, 'minutes');
    return kstDate.format();
  },

  //  
  dateComparison: function (date1, date2) {
    // 하루를 밀리초로 변환 (1000 ms/s * 60 s/min * 60 min/hr * 24 hr/day)
    const MS_PER_DAY = 1000 * 60 * 60 * 24; 

    // 두 날짜의 차이
    const diffInMs = date1.getTime() - date2.getTime();

    // 차이를 일수로 변환하고 소수점 이하를 버림
    const diffInDays = Math.floor(diffInMs / MS_PER_DAY);

    // 차이가 정확히 1일이면 true, 아니면 false를 반환
    return diffInDays === 1;
  }
}

export { updateTime }