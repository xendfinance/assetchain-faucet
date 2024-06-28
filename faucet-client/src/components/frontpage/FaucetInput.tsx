import React, { useContext } from "react";
import { IFaucetConfig } from "../../common/FaucetConfig";
import { IFaucetContext } from "../../common/FaucetContext";
import { FaucetCaptcha } from "../shared/FaucetCaptcha";
import { GithubLogin } from "./GithubLogin";

export interface IFaucetInputProps {
	faucetContext: IFaucetContext;
	faucetConfig: IFaucetConfig;
	defaultAddr?: string;
	submitInputs(inputs: any): Promise<void>;
}

export interface IFaucetInputState {
	submitting: boolean;
	targetAddr: string;
}

export class FaucetInput extends React.PureComponent<IFaucetInputProps, IFaucetInputState> {
	
	private faucetCaptcha = React.createRef<FaucetCaptcha>();
	private githubLogin = React.createRef<GithubLogin>();
	
	constructor(props: IFaucetInputProps, state: IFaucetInputState) {
		super(props);

		this.state = {
			submitting: false,
			targetAddr: this.props.defaultAddr || "",
		};
	}

	public render(): React.ReactElement<IFaucetInputProps> {
		let needGithubAuth = !!this.props.faucetConfig.modules.github;
		let requestCaptcha = !!this.props.faucetConfig.modules.captcha?.requiredForStart;
		let inputTypes: string[] = [];
		if (this.props.faucetConfig.modules.ensname?.required) {
			inputTypes.push("ENS name");
		} else {
			inputTypes.push("Asset Chain address");
			if (this.props.faucetConfig.modules.ensname) inputTypes.push("ENS name");
		}

		let submitBtnCaption: string;
		if (this.props.faucetConfig.modules.pow) {

			submitBtnCaption = "Start Mining";
		} else {
			submitBtnCaption = "Request Funds";
		}
		return (
			<div className="faucet-inputs">
				<input
					className="form-control"
					value={this.state.targetAddr}
					placeholder={"Please enter " + inputTypes.join(" or ")}
					onChange={(evt) => this.setState({ targetAddr: evt.target.value })}
				/>
				{needGithubAuth ? (
					<GithubLogin
						faucetConfig={this.props.faucetConfig}
						faucetContext={this.props.faucetContext}
						ref={this.githubLogin}
					/>
				) : null}
				{requestCaptcha ? (
					<div className="faucet-captcha">
						<FaucetCaptcha faucetConfig={this.props.faucetConfig} ref={this.faucetCaptcha} variant="session" />
					</div>
				) : null}
				
				{this.props.faucetConfig.assetFaucetCoinType ?
				<>
				<div className="faucet-actions center">
					<button
						className="btn btn-success start-action"
						onClick={(evt) => this.onSubmitBtnClick("native","RWA")}
						disabled={this.state.submitting}
					>
						{this.state.submitting ? (
							<span className="inline-spinner">
								<img src="/images/spinner.gif" className="spinner" />
							</span>
						) : null}
						{submitBtnCaption} RWA
					</button>
					
				</div>
				<div className="faucet-actions center">
				<button
					className="btn btn-success start-action"
					onClick={(evt) => this.onSubmitBtnClick("erc20", this.props.faucetConfig.faucetCoinContractSymbol)}
					disabled={this.state.submitting}
				>
					{this.state.submitting ? (
						<span className="inline-spinner">
							<img src="/images/spinner.gif" className="spinner" />
						</span>
					) : null}
					{submitBtnCaption} {this.props.faucetConfig.faucetCoinContractSymbol}
				</button>
				
			</div>
				</>
				:
				this.props.faucetConfig.faucetCoinType == "native"?
				<div className="faucet-actions center">
				<button
					className="btn btn-success start-action"
					onClick={(evt) => this.onSubmitBtnClick(this.props.faucetConfig.faucetCoinType, this.props.faucetConfig.faucetCoinSymbol)}
					disabled={this.state.submitting}
				>
					{this.state.submitting ? (
						<span className="inline-spinner">
							<img src="/images/spinner.gif" className="spinner" />
						</span>
					) : null}
					{submitBtnCaption} 
				</button>
				
			</div>
			:
			<div className="faucet-actions center">
				<button
					className="btn btn-success start-action"
					onClick={(evt) => this.onSubmitBtnClick(this.props.faucetConfig.faucetCoinType,this.props.faucetConfig.faucetCoinSymbol )}
					disabled={this.state.submitting}
				>
					{this.state.submitting ? (
						<span className="inline-spinner">
							<img src="/images/spinner.gif" className="spinner" />
						</span>
					) : null}
					{submitBtnCaption } {this.props.faucetConfig.faucetCoinSymbol}
				</button>
				
			</div>
				}
				
			</div>
		);
	}

	private async onSubmitBtnClick(tokenType: string, symbol: string) {
		this.setState({
			submitting: true,
		});

		try {
			let inputData: any = {};

			inputData.addr = this.state.targetAddr;
			this.props.faucetConfig.faucetCoinType = tokenType;
			this.props.faucetConfig.faucetCoinSymbol = symbol
			if (this.props.faucetConfig.modules.captcha?.requiredForStart) {
				inputData.captchaToken = await this.faucetCaptcha.current?.getToken();
			}
			if (this.props.faucetConfig.modules.github) {
				inputData.githubToken = await this.githubLogin.current?.getToken();
			}

			await this.props.submitInputs(inputData);
		} catch (ex) {
			if (this.faucetCaptcha.current) this.faucetCaptcha.current.resetToken();
			throw ex;
		} finally {
			this.setState({
				submitting: false,
			});
		}
	}
}
