export const checkAccountRule = value => {
  const regexp = /^[A-Za-z0-9._]+$/i
  if (
    value &&
    regexp.test(value) &&
    (value.length >= 5 && value.length <= 16)
  ) {
    return true
  }

  return '5자 이상 16자 이하 문자, 숫자 및 일부 특수문자(+/./_)만 가능합니다.'
}
