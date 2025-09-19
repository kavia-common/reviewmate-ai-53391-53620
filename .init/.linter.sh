#!/bin/bash
cd /home/kavia/workspace/code-generation/reviewmate-ai-53391-53620/FrontendService
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

