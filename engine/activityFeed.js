export function createActivityEntry(activityData) {
  return {
    activityId: activityData.activityId,
    label: activityData.label,
    createdAt: Date.now()
  };
}

export function createTickerNotice(noticeData) {
  return {
    noticeId: noticeData.noticeId,
    label: noticeData.label,
    createdAt: Date.now()
  };
}
