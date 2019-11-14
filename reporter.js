const fs = require('fs')

const SAVE_REPORT_TO = '../TESTS_REPORT.md'

const PASSED = 'passed'
const FAILED = 'failed'
const PENDING = 'pending'
const TODO = 'todo'

const statusColor = status => {
  switch (status) {
    case PASSED:
      return 'green'
    case FAILED:
      return 'red'
    case PENDING:
      return 'orange'
    default:
      return 'grey'
  }
}

const statusIcon = status => {
  switch (status) {
    case PASSED:
      return '✓'
    case FAILED:
      return '✗'
    case PENDING:
      return '–'
    default:
      return '–'
  }
}

const renderStatus = test =>
  `<span style='color:${statusColor(test.status)}'>${statusIcon(test.status)}</span>`

let lastAncestors = ''
const renderAncestors = test => {
  const ancestors = test.ancestorTitles.map(it => `**${it}**`).join(' ')
  const spaces = '&nbsp;&nbsp;&nbsp;&nbsp;'
  if (ancestors === lastAncestors) return spaces

  lastAncestors = ancestors
  return `${ancestors}

${spaces}`
}

const renderTestItem = test => `
${renderAncestors(test)}${renderStatus(test)} ${test.title}  
`

const renderTestResultItem = testResultItem =>
  testResultItem.testResults.map(renderTestItem).join('')

const renderTestResults = testResults =>
  testResults.map(renderTestResultItem).join('\n\n')

class Reporter {
  onRunComplete(_, results) {
    const content = `**Total:** ${results.numTotalTests}

**<span style='color:${statusColor(PASSED)}'>Passed:</span>** ${
      results.numPassedTests
    }

**<span style='color:${statusColor(FAILED)}'>Failed:</span>** ${
      results.numFailedTests
    }

**<span style='color:${statusColor(PENDING)}'>Skipped:</span>** ${
      results.numPendingTests
    }

**<span style='color:${statusColor(TODO)}'>Todo:</span>** ${
      results.numTodoTests
    }

---
${renderTestResults(results.testResults)}
`
    fs.writeFile(SAVE_REPORT_TO, content)
  }
}

module.exports = Reporter
