const HOOK_PATH = '.git/hooks/post-receive';

const HOOK_CONTENT = `#!/bin/bash
unset GIT_INDEX_FILE
git --work-tree=/app --git-dir=/app/.git checkout -f
`;

const REMOTE_NAME = 'glitcheroo';

module.exports = { HOOK_PATH, HOOK_CONTENT, REMOTE_NAME };
