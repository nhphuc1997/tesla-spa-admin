const banerResourceOptions = {
  properties: {
    orderNo: {
      availableValues: [
        { label: '1st', value: 1 },
        { label: '2nd', value: 2 },
        { label: '3rd', value: 3 },
        { label: '4th', value: 4 },
        { label: '5th', value: 5 },
        { label: '6th', value: 6 },
      ]
    },
    active: { type: 'boolean' },
    s3Key: { isDisabled: true },
    bucket: { isDisabled: true },
    mime: { isDisabled: true },
  },
}

export default banerResourceOptions;
