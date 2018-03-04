import {merge} from 'ramda'

/**
 * Generic controllers
 * Meta controllers for Mongoose to query DB
*/
export const controllers = {

  createOne(model, body) {
    return model.create(body)
  },

  updateOne: (model, docToUpdate, update) => {
    const updatedDoc = merge(docToUpdate._doc, update)
    return model.db.collections.books.save(updatedDoc)
  },

  deleteOne: (model, docToDelete) => {
    return model.find({_id: docToDelete}).remove(err => {
      if(err) console.error(err)
      else console.log(`doc ${docToDelete} has been deleted!`)
      }
    )
  },

  getOne: (docToGet) => {
    // placeholder for data manipulation - returns undefined for now
    return Promise.resolve(docToGet)
  },

  getAll(model) {
    return model.find({}).exec()
  },

  findByParam(model, id) {
    // mongo returns a Promise
    return model.findById(id).exec()
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
  const update = req.body
  const docId = req.params.id
  try {
    const docToUpdate = await controllers.findByParam(model, docId)
  } catch(e) {
    console.error(`Failed to fetch document:\n ${e}`)
  }

  return controllers.updateOne(model, docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const deleteOne = (model) => (req, res, next) => {
  return controllers.deleteOne(model, req.params.id)
    .catch(error => next(error))
}

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(undefined)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
}

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

export const findByParam = (model) => (req, res, next, id) => {
  return controllers.findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error('Not Found Error'))
      } else {
          res.status(200).json(doc)
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