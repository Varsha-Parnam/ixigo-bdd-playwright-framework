module.exports = {
    default: {
        require:[
            'tests/stepDefination/*.js',
            'tests/hooks/*.js'
        ],
        paths:[
            'tests/features/*.feature'
        ],
        format:[
            'progress',
            'allure-cucumberjs/reporter'
        ],
        formatOptions:{
            resultDir:'allure-results'
        },
        timeout:80000
    }
 }

// export default {
//     default: {
//         import: [
//             'tests/stepDefination/**/*.js', // Added ** to search subfolders
//             'tests/hooks/**/*.js'           // Added ** to search subfolders
//         ],
//         paths: [
//             'tests/features/**/*.feature'   // Added ** to search subfolders
//         ],
//         format: [
//             'progress',
//             'allure-cucumberjs/reporter'
//         ],
//         formatOptions: {
//             resultsDir: 'allure-results'
//         },
//         timeout: 80000
//     }
// }

