export function createContact(name, phone) {
  return {
    type: 'PUSH',
    objects: [{
      id: `cx-${new Date().getTime()}`,
      type: 'contact',
      attributes: { name, phone },
    }],
  }
}
