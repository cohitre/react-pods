const INITIAL_STATE = {
  contact: {
    'cx-123': {
      name: 'Joe',
      phone: '123-333-4444',
    },
    'cx-345': {
      name: 'Bob',
      phone: '444-222-2121',
    }
  }
};

export default function(state = INITIAL_STATE, action) {
  const contact = state.contact;
  if (action.type === 'PUSH') {
    action.objects.forEach(c => contact[c.id] = c.attributes);
  }
  return { contact };
}
