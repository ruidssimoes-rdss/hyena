'use client';

import * as React from 'react';
import type { LintIssue } from '@/lib/linter/types';
import { ruleExplanations } from '@/lib/linter/rule-explanations';
import { applyFix, applyAllFixes } from '@/lib/linter/fixes';

interface LintResultsProps {
  issues: LintIssue[];
  score: number;
  code: string;
  onCodeChange: (code: string) => void;
}

export function LintResults({ issues, score, code, onCodeChange }: LintResultsProps) {
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const infos = issues.filter((i) => i.severity === 'info');

  const fixableIssues = issues.filter((issue) => {
    const result = applyFix(code, issue);
    return result.canFix;
  });
  const fixableCount = fixableIssues.length;

  const scoreColor = score >= 90 ? 'text-green-600 dark:text-green-500' : score >= 70 ? 'text-amber-600 dark:text-amber-500' : 'text-red-600 dark:text-red-500';

  const handleFixAll = () => {
    const fixedCode = applyAllFixes(code, issues);
    onCodeChange(fixedCode);
  };

  const handleFixIssue = (issue: LintIssue) => {
    const result = applyFix(code, issue);
    if (result.canFix && result.fixedCode) {
      onCodeChange(result.fixedCode);
    }
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between py-3 border-b border-border">
        <div className="flex items-center gap-4">
          <span className="font-medium text-foreground">Results</span>
          <span className="text-sm text-muted-foreground">
            {errors.length > 0 && `${errors.length} error${errors.length !== 1 ? 's' : ''}`}
            {errors.length > 0 && warnings.length > 0 && ' · '}
            {warnings.length > 0 && `${warnings.length} warning${warnings.length !== 1 ? 's' : ''}`}
            {(errors.length > 0 || warnings.length > 0) && infos.length > 0 && ' · '}
            {infos.length > 0 && `${infos.length} info`}
            {issues.length === 0 && 'No issues found'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {fixableCount > 0 && (
            <button
              onClick={handleFixAll}
              className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Fix All ({fixableCount})
            </button>
          )}
          <span className={`text-lg font-semibold ${scoreColor}`}>{score}/100</span>
        </div>
      </div>

      {/* Issues List */}
      {issues.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Your code passed all checks.</p>
      ) : (
        <div className="mt-4 space-y-1">
          {issues.map((issue, index) => (
            <LintIssueRow key={index} issue={issue} code={code} onFix={handleFixIssue} />
          ))}
        </div>
      )}
    </div>
  );
}

interface LintIssueRowProps {
  issue: LintIssue;
  code: string;
  onFix: (issue: LintIssue) => void;
}

function LintIssueRow({ issue, code, onFix }: LintIssueRowProps) {
  const [expanded, setExpanded] = React.useState(false);

  const borderColors = {
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500',
  };

  const borderColor = borderColors[issue.severity];
  const explanation = ruleExplanations[issue.rule];

  const fixResult = applyFix(code, issue);
  const isFixable = fixResult.canFix;

  return (
    <div className={`border-l-2 ${borderColor} pl-4 py-3`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{issue.rule}</span>
          <span className="text-xs text-muted-foreground">Line {issue.line}</span>
        </div>
        {isFixable && (
          <button
            onClick={() => onFix(issue)}
            className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Apply Fix
          </button>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-2">{issue.message}</p>

      {issue.code && (
        <pre className="text-xs bg-muted/50 p-2 rounded border border-border overflow-x-auto">
          <code className="text-foreground">{issue.code}</code>
        </pre>
      )}

      {(issue.fix || issue.docs) && (
        <p className="text-xs text-muted-foreground mt-2">
          {issue.fix && <>Fix: {issue.fix}</>}
          {issue.fix && issue.docs && <> · </>}
          {issue.docs && (
            <a href="#" className="hover:underline">
              {issue.docs}
            </a>
          )}
        </p>
      )}

      {explanation && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-muted-foreground hover:text-foreground mt-1 transition-colors"
          >
            {expanded ? 'Hide explanation' : 'Why this matters?'}
          </button>

          {expanded && (
            <div className="mt-2 pt-2 border-t border-border text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Why: </span>
                <span className="text-foreground">{explanation.why}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Impact: </span>
                <span className="text-foreground">{explanation.impact}</span>
              </p>
              <a
                href={explanation.learnMore}
                target={explanation.learnMore.startsWith('http') ? '_blank' : undefined}
                rel={explanation.learnMore.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block text-xs text-muted-foreground hover:text-foreground hover:underline"
              >
                Learn more →
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
