export default {
    displayName: 'xchange-devskiller',
    preset: './jest.preset.js',
    setupFilesAfterEnv: ['./src/test-setup.ts'],
    testEnvironment: 'jsdom',
    coverageDirectory: './coverage',
    transform: {
        '^.+.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                isolatedModules: true
            }
        ]
    },
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ],
    coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
    collectCoverage: true
};
