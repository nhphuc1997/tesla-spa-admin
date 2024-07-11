const productResourceOptions = {
  properties: {
    shortDesciption: { type: 'textarea' },
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
  },
}

export default productResourceOptions;
