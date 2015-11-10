export default {
  ClassDeclaration: {
    type: 'c'
  },
  MethodDeclaration: {
    type: 'f',
    opts: item => {
      return {
        class: item.parent.parent.id.name
      }
    }
  },
  VariableDeclarator: {
    type: 'v'
  },
  ImportDefaultSpecifier: {
    type: 'i'
  },
  ImportSpecifier: {
    type: 'i'
  },
  FunctionDeclaration: {
    type: 'f' 
  },
  ClassMethod: {
    type: 'm'
  }
};
