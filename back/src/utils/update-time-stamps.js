import { updateTime } from "./update-time.js"

// timestamps의 createdAt와 updatedAt 한국시간으로 Update
export function updateTimestamps(preQuery) {
  const updateQuery = {
    ...preQuery._doc,
    createdAt: updateTime.toKST(preQuery.createdAt),
    updatedAt: updateTime.toKST(preQuery.updatedAt), 
  }
  // challenge의 경우 dueDate가 있어서 추가적으로 변경
  if (preQuery.dueDate) {
    query.dueDate = updateTime.toKST(preQuery.dueDate);
  }
  
  return updateQuery
}