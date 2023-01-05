import { docToResource, findIn, upsert } from '@/helpers'

const makeAppendChildToParentMutation = ({ parent, child }) => (state, { childId, parentId }) => {
  const resource = findIn(state[parent]).byId(parentId)

  if (!resource)
    return console.warn(`Parent resource ${parent} with id ${parentId} not found.`)
  
  resource[child] = resource[child] || []
  
  if (!resource[child].includes(childId))
    resource[child].push(childId)
}

export default {
  appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),
  appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
  appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
  appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
  setItem: (state, { resource, item }) => upsert(state[resource], docToResource(item))
}
