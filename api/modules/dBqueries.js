const mockTestData = {
  message: 'Hai!'
}

/** Generic controllers */
export const controllers = {

  createOne(model, body) {
    return Promise.resolve(mockTestData)
  },

  updateOne: (docToUpdate, update) => {
    return Promise.resolve(mockTestData)
  },

  deleteOne: (docToDelete) => {
    return Promise.resolve(mockTestData)
  },

  getOne: (docToGet) => {
    return Promise.resolve(mockTestData)
  },

  getAll(model) {
    return Promise.resolve(mockTestData)
  },

  findByParam(model, id) {
    return Promise.resolve(mockTestData)
  }

}


/** 
 * Controllers definitions 
 * overload model with model param
 * instantiated in .controllers.js file
 * create closure to get input within the route when controller is passed a middleware
*/
export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const deleteOne = (model) => (req, res, next) => {
  return controllers.deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(req.docToUpdate)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
}

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

export const findByParam = (model) => (req, res, next, id) => {
  console.log(req)
  return controllers.findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error('Not Found Error'))
      } else {
        req.docFromId
        next()
      }
    })
    .catch(error => {
      next(error)
    })
}


/** Instantiate Controllers */
export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  }

  return {...defaults, ...overrides}
}