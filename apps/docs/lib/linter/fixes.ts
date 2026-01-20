import type { LintIssue } from './types';

export interface FixResult {
  canFix: boolean;
  fixedCode?: string;
  description: string;
}

export function applyFix(code: string, issue: LintIssue): FixResult {
  const lines = code.split('\n');
  const lineIndex = issue.line - 1;
  const line = lines[lineIndex];

  if (!line) {
    return { canFix: false, description: 'Could not find line' };
  }

  switch (issue.rule) {
    case 'missing-accessibility-label': {
      // Add accessibilityLabel to Pressable/TouchableOpacity
      // <Pressable onPress={x}> → <Pressable onPress={x} accessibilityLabel="Action">
      const fixed = line.replace(
        /(<(?:Pressable|TouchableOpacity)[^>]*)(>)/,
        '$1 accessibilityLabel="Action"$2'
      );
      if (fixed !== line) {
        lines[lineIndex] = fixed;
        return { canFix: true, fixedCode: lines.join('\n'), description: 'Added accessibilityLabel' };
      }
      return { canFix: false, description: 'Could not auto-fix' };
    }

    case 'missing-accessibility-role': {
      // Add accessibilityRole="button"
      const fixed = line.replace(
        /(<(?:Pressable|TouchableOpacity|TouchableHighlight)[^>]*)(>)/,
        '$1 accessibilityRole="button"$2'
      );
      if (fixed !== line) {
        lines[lineIndex] = fixed;
        return { canFix: true, fixedCode: lines.join('\n'), description: 'Added accessibilityRole="button"' };
      }
      return { canFix: false, description: 'Could not auto-fix' };
    }

    case 'image-missing-alt': {
      // Add accessible and accessibilityLabel to Image
      const fixed = line.replace(/(<Image[^>]*)(\/?>)/, '$1 accessible accessibilityLabel="Image description"$2');
      if (fixed !== line) {
        lines[lineIndex] = fixed;
        return { canFix: true, fixedCode: lines.join('\n'), description: 'Added accessibility props' };
      }
      return { canFix: false, description: 'Could not auto-fix' };
    }

    case 'touchable-missing-feedback': {
      // Replace TouchableWithoutFeedback with Pressable
      let fixed = line.replace('TouchableWithoutFeedback', 'Pressable');
      if (fixed !== line) {
        // Also check if there's a closing tag on this line
        fixed = fixed.replace('</TouchableWithoutFeedback>', '</Pressable>');
        lines[lineIndex] = fixed;

        // Check subsequent lines for closing tag
        for (let i = lineIndex + 1; i < lines.length; i++) {
          if (lines[i].includes('</TouchableWithoutFeedback>')) {
            lines[i] = lines[i].replace('</TouchableWithoutFeedback>', '</Pressable>');
            break;
          }
        }

        return { canFix: true, fixedCode: lines.join('\n'), description: 'Replaced with Pressable' };
      }
      return { canFix: false, description: 'Could not auto-fix' };
    }

    case 'hardcoded-color': {
      // Can suggest but not auto-fix (would need to know which token to use)
      return { canFix: false, description: 'Replace with design token manually' };
    }

    case 'hardcoded-spacing': {
      // Find nearest valid spacing value
      const match = line.match(/(padding|margin|paddingHorizontal|paddingVertical|marginHorizontal|marginVertical|paddingTop|paddingBottom|paddingLeft|paddingRight|marginTop|marginBottom|marginLeft|marginRight|gap):\s*(\d+)/);
      if (match) {
        const value = parseInt(match[2]);
        const validSpacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
        const nearest = validSpacing.reduce((prev, curr) =>
          Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
        const fixed = line.replace(new RegExp(`(${match[1]}:\\s*)${value}`), `$1${nearest}`);
        lines[lineIndex] = fixed;
        return { canFix: true, fixedCode: lines.join('\n'), description: `Changed to ${nearest}px` };
      }
      return { canFix: false, description: 'Could not auto-fix' };
    }

    case 'non-token-font-size': {
      const match = line.match(/fontSize:\s*(\d+)/);
      if (match) {
        const value = parseInt(match[1]);
        const validSizes = [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60];
        const nearest = validSizes.reduce((prev, curr) =>
          Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
        const fixed = line.replace(/fontSize:\s*\d+/, `fontSize: ${nearest}`);
        lines[lineIndex] = fixed;
        return { canFix: true, fixedCode: lines.join('\n'), description: `Changed to ${nearest}px` };
      }
      return { canFix: false, description: 'Could not auto-fix' };
    }

    case 'missing-dark-mode': {
      // Can't auto-fix className without knowing the right dark variant
      return { canFix: false, description: 'Add dark: variant manually' };
    }

    case 'small-touch-target': {
      // Replace w-X h-X with w-11 h-11
      let fixed = line;
      fixed = fixed.replace(/\bw-(\d|10)\b/, 'w-11');
      fixed = fixed.replace(/\bh-(\d|10)\b/, 'h-11');
      if (fixed !== line) {
        lines[lineIndex] = fixed;
        return { canFix: true, fixedCode: lines.join('\n'), description: 'Increased to 44px minimum' };
      }
      return { canFix: false, description: 'Could not auto-fix' };
    }

    case 'inconsistent-radius': {
      // Can't auto-fix without knowing design preference
      return { canFix: false, description: 'Use standard radius value' };
    }

    default:
      return { canFix: false, description: 'No auto-fix available' };
  }
}

// Check if an issue can be fixed without actually applying the fix
export function canFixIssue(issue: LintIssue): boolean {
  const nonFixableRules = ['hardcoded-color', 'missing-dark-mode', 'inconsistent-radius'];
  return !nonFixableRules.includes(issue.rule);
}

// Apply all fixable issues at once
export function applyAllFixes(code: string, issues: LintIssue[]): string {
  let fixedCode = code;

  // Sort by line number descending so we fix from bottom to top
  // (this prevents line number shifts from affecting subsequent fixes)
  const sortedIssues = [...issues].sort((a, b) => b.line - a.line);

  for (const issue of sortedIssues) {
    const result = applyFix(fixedCode, issue);
    if (result.canFix && result.fixedCode) {
      fixedCode = result.fixedCode;
    }
  }

  return fixedCode;
}
