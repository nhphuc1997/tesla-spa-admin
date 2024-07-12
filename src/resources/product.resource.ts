const productResourceOptions = {
  properties: {
    shortDescription: { type: 'textarea' },
    description: { type: 'richtext' },
    textIntro: { type: 'textarea' },
    price: { type: 'currency' },
    name: { type: 'text' },
    color: { type: 'text' },
    category: { reference: 'Category' },
    kind: {
      availableValues: [
        { label: 'NEW', value: 'NEW' },
        { label: 'OLD', value: 'OLD' },
      ]
    },
    seat: {
      availableValues: [
        { label: '5 SEAT', value: 5 },
        { label: '4 SEAT', value: 4 },
        { label: '7 SEAT', value: 7 },
      ]
    },
    s3Key: { isDisabled: true },
    bucket: { isDisabled: true },
    mime: { isDisabled: true },
  },
}

export default productResourceOptions;
