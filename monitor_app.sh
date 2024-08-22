#!/bin/bash

# Path to the file you want to delete
FILE_PATH="new-faucet-store.db"

# Path to the folder you want to delete
FOLDER_PATH="new-faucet-store.db.lock"

# PM2 process name or ID to stop and delete
PM2_APP_NAME="faucet-ui"

# Command to start your new app with PM2
START_CMD="pm2 start parse_apps_ui.config.cjs"

# URL to check for a 502 error
APP_URL="https://faucet.assetchain.org/"

# Function to delete a file
delete_file() {
    if [ -f "$FILE_PATH" ]; then
        echo "Deleting file: $FILE_PATH"
        rm "$FILE_PATH"
    else
        echo "File not found: $FILE_PATH"
    fi
}

# Function to delete a folder
delete_folder() {
    if [ -d "$FOLDER_PATH" ]; then
        echo "Deleting folder: $FOLDER_PATH"
        rm -rf "$FOLDER_PATH"
    else
        echo "Folder not found: $FOLDER_PATH"
    fi
}

# Function to stop and delete the current app on PM2
stop_pm2_app() {
    echo "Stopping and deleting PM2 app: $PM2_APP_NAME"
    pm2 stop "$PM2_APP_NAME"
    pm2 delete "$PM2_APP_NAME"
}

# Function to start a new app on PM2
start_new_app() {
    echo "Starting new app with PM2"
    eval "$START_CMD"
}

# Function to check if the app is returning a 502 error
check_app_status() {
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL)
    if [ "$HTTP_STATUS" -eq 502 ] || [ "$HTTP_STATUS" -eq 503 ]; then
        echo "Detected 502 error!"
        return 1  # 502 detected, app is considered "crashed"
    else
        return 0  # App is running fine
    fi
}

# Function to monitor the app
monitor_app() {
    while true; do
        # Check if the app is returning a 502 error
        check_app_status
        APP_STATUS=$?

        if [ $APP_STATUS -ne 0 ]; then
            echo "App has crashed! Performing recovery actions..."
            delete_file
            delete_folder
            stop_pm2_app
            start_new_app
        fi

        # Check every 10 seconds
        sleep 10
    done
}

# # Main script execution
monitor_app
