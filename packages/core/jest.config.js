module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
      'default',
      [
        'jest-junit',
        {
          outputName: 'junit-TEST.xml',
        },
      ],
    ],
    moduleFileExtensions: [
      "web.js",
      "js",
      "json",
      "web.jsx",
      "jsx",
      "node",
      "mjs",
      "ts"
    ]
  }