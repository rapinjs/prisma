let localRegistry: any

export const initRegistry = ({ registry }) => {
  localRegistry = registry
}

export const getRegistry = () => localRegistry
