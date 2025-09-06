const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  displayName: 'Government Integration Module',
  testEnvironment: `node`,
  rootDir: './',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
  transform: {
    '^.+\\.[jt]s?$': [
      'ts-jest',
      {
        tsconfig: compilerOptions,
        isolatedModules: false
      }
    ]
  },
  moduleNameMapping: {
    '^@mercurjs/(.*)$': '<rootDir>/../$1/src'
  }
}
