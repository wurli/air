import * as vscode from "vscode";
import {
	FileFormatSettings,
	SyncFileSettingsParams,
} from "./notification/sync-file-settings";

type LogLevel = "error" | "warn" | "info" | "debug" | "trace";

// This is a direct representation of the Client settings sent to the Server in the
// `initializationOptions` field of `InitializeParams`. These are only pulled at the
// user level since they are global settings on the server side (and are scoped to
// `"scope": "application"` in `package.json` so they can't even be set at workspace level).
export type InitializationOptions = {
	logLevel?: LogLevel;
	dependencyLogLevels?: string;
};

export function getInitializationOptions(
	namespace: string,
): InitializationOptions {
	const config = getConfiguration(namespace);

	return {
		logLevel: getOptionalUserValue<LogLevel>(config, "logLevel"),
		dependencyLogLevels: getOptionalUserValue<string>(
			config,
			"dependencyLogLevels",
		),
	};
}

function getOptionalUserValue<T>(
	config: vscode.WorkspaceConfiguration,
	key: string,
): T | undefined {
	const inspect = config.inspect<T>(key);
	return inspect?.globalValue;
}

function getConfiguration(
	config: string,
	scope?: vscode.ConfigurationScope,
): vscode.WorkspaceConfiguration {
	return vscode.workspace.getConfiguration(config, scope);
}
