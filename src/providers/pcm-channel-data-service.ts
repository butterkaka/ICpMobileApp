import { Constants } from './../shared/app.constant';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DeviceModel } from '../Models/ExportModelClass';
/*
  Generated class for the PCMChannelDataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  created by jkm5kor -  20-06-2017
*/
@Injectable()
export class PCMChannelDataService {



  alert = null; // testing Anu - for alertCntrl close.
  deviceIdGlobal: string;
  deviceObjectGlobal: DeviceModel;
  isIOOverViewMock: boolean;
  loaderGlobal;

  // Password Global Values
  passwordDeviceSetupPageFlag: boolean = false;
  passwordFlag: boolean = false;
  passwordString: string = "";

  passwordPromt: boolean = false;

  //SI unit Global values
  temperatureDisplayUnit;
  pressureDisplayUnit;

  //Mockdata check global value
  mockData: boolean = false;
  appResetFlag: boolean = true;
  //disconnectAfterResume: boolean = true;

  regulatorSetupItems = [
    { Title: 'Feed forward', Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%' },
    { Title: 'Proportional gain', Value: 0, Min: 0, Max: 500, Steps: 5, Metric: '' },
    { Title: 'Integration time', Value: 0, Min: 0.5, Max: 60, Steps: 0.5, Metric: 's' },
    // { Title: 'Derivation gain', Value: 0.0, Min: 0.0, Max: 1.0, Steps: 0.10, Metric: 's' },                      --TBD
    // { Title: 'Derivation decline time', Value: 0.0, Min: 0.0, Max: 1.0, Steps: 0.10, Metric: 's' },              --TBD
    { Title: 'Max feedback deviation', Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%' }

  ];

  // { Title: Constants.values.pPartGain, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%' },
  // { Title: Constants.values.iPartTime, Value: 0, Min: 0, Max: 10000, Steps: 10, Metric: 's' },
  // { Title: Constants.values.dPartGain, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%' },
  // { Title: Constants.values.feedforwardPercentage, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%' },
  // { Title: Constants.values.positiveOperationPercentage, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%' },
  // { Title: Constants.values.negativeOperationPercentage, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%' },
  // { Title: Constants.values.errorLimitPercentage, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%' },
  pressureRegulatorSetupItems = [

    { 'name': Constants.values.swashAngle, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.sswashAngleSubChannel },
    { 'name': Constants.values.pressureRegulator, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pressureRegSubChannel },
    { 'name': Constants.values.pPart, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pPartPressureRegSubChannel },
    { 'name': Constants.values.pPartGain, 'isDropdown': false, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pPartGainPressureRegSubChannel },
    { 'name': Constants.values.iPart, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.iPartPressureRegSubChannel },
    { 'name': Constants.values.iPartTime, 'isDropdown': false, Value: 0, Min: 0.5, Max: 10000, Steps: 0.1, Metric: 's', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.iPartTimePressureRegSubChannel },
    { 'name': Constants.values.dPart, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.dPartPressureRegSubChannel },
    { 'name': Constants.values.dPartGain, 'isDropdown': false, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.dPartGainPressureRegSubChannel },
    { 'name': Constants.values.feedforwardPercentage, 'isDropdown': false, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.feedForwardPressureRegSubChannel },
    { 'name': Constants.values.positiveOperationPercentage, 'isDropdown': false, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.positiveOperationPressureRegSubChannel },
    { 'name': Constants.values.negativeOperationPercentage, 'isDropdown': false, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.negativeOperationPressureRegSubChannel },
    { 'name': Constants.values.errorLimitPercentage, 'isDropdown': false, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.errorLimitPressureRegSubChannel },
    { 'name': Constants.values.invertFeedbackDirection, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.invertFeedbackDirectionPressureRegSubChannel }
  ];

  /** 
 * This is used to get input values list of Swash setup
 * @returns {JSON} regulatorSetupInputList - The regularsetup data
 */
  // static getPressureRegulatorsetupInputDetails() {
  //   let regulatorSetupInputList = [
  //     { 'name': Constants.values.swashAngle, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.sswashAngleSubChannel },
  //     { 'name': Constants.values.pressureRegulator, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pressureRegSubChannel },
  //     { 'name': Constants.values.pPart, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pPartPressureRegSubChannel },
  //     { 'name': Constants.values.pPartGain, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pPartGainPressureRegSubChannel },
  //     { 'name': Constants.values.iPart, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.iPartPressureRegSubChannel },
  //     { 'name': Constants.values.iPartTime, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.iPartTimePressureRegSubChannel },
  //     { 'name': Constants.values.dPart, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.dPartPressureRegSubChannel },
  //     { 'name': Constants.values.dPartGain, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.dPartGainPressureRegSubChannel },
  //     { 'name': Constants.values.feedforwardPercentage, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.feedForwardPressureRegSubChannel },
  //     { 'name': Constants.values.positiveOperationPercentage, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.positiveOperationPressureRegSubChannel },
  //     { 'name': Constants.values.negativeOperationPercentage, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.negativeOperationPressureRegSubChannel },
  //     { 'name': Constants.values.errorLimitPercentage, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.errorLimitPressureRegSubChannel },
  //     { 'name': Constants.values.invertFeedbackDirection, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.invertFeedbackDirectionPressureRegSubChannel }
  //   ]
  //   return regulatorSetupInputList;
  // }


  // { Title: Constants.values.pPartGain,'isDropdown':true,  Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '' },
  //   { Title: Constants.values.iPartTime,'isDropdown':true, Value: 0, Min: 0, Max: 6000, Steps: 10, Metric: 's' },
  //   { Title: Constants.values.integrationOffOverThisError, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%' },
  //   { Title: Constants.values.feedforwardPercentage, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%' },
  //   { Title: Constants.values.swashAngleErrorLimitPercentage, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%' }
  swashAngleSetupItems = [
    { 'name': Constants.values.pressureRegulator, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pressureRegSubChannel },
    { 'name': Constants.values.swashAngle, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.sswashAngleSubChannel },
    { 'name': Constants.values.pPart, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.pPartSubChannel },
    { 'name': Constants.values.pPartGain, 'isDropdown': false, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.pPartGainSubChannel },
    { 'name': Constants.values.iPart, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.iPartSubChannel },
    { 'name': Constants.values.iPartTime, 'isDropdown': false, Value: 0, Min: 0.5, Max: 6000, Steps: 0.1, Metric: 's', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.iPartTimeSubChannel },
    { 'name': Constants.values.integrationOffOverThisError, 'isDropdown': false, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.integrationOffOverThisErrorSubChannel },
    { 'name': Constants.values.feedforwardPercentage, 'isDropdown': false, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.feedforwardPercentageSubChannel },
    { 'name': Constants.values.swashAngleErrorLimitPercentage, 'isDropdown': false, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.swashAngleErrorLimitPercentageSubChannel },
    { 'name': Constants.values.iinvertSwashAngleDirection, 'isDropdown': true, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.invertSwashAngleDirectionSubchannel }

  ];

  /** 
 * This is used to get input values list of Swash setup
 * @returns {JSON} regulatorSetupInputList - The regularsetup data
 */
  // static getSwashsetupInputDetails() {
  //   let regulatorSetupInputList = [
  //     { 'name': Constants.values.pressureRegulator, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pressureRegSubChannel },
  //     { 'name': Constants.values.swashAngle, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.sswashAngleSubChannel },
  //     { 'name': Constants.values.pPart, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.pPartSubChannel },
  //     { 'name': Constants.values.pPartGain, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.pPartGainSubChannel },
  //     { 'name': Constants.values.iPart, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.iPartSubChannel },
  //     { 'name': Constants.values.iPartTime, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.iPartTimeSubChannel },
  //     { 'name': Constants.values.integrationOffOverThisError, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.integrationOffOverThisErrorSubChannel },
  //     { 'name': Constants.values.feedforwardPercentage, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.feedforwardPercentageSubChannel },
  //     { 'name': Constants.values.swashAngleErrorLimitPercentage, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.swashAngleErrorLimitPercentageSubChannel },
  //     { 'name': Constants.values.iinvertSwashAngleDirection, 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.invertSwashAngleDirectionSubchannel }
  //   ]
  //   return regulatorSetupInputList;
  // }


  rampSetupItems = [
    { Title: Constants.values.shutdownRamp, Value: 0, Min: 0, Max: 60, Steps: 1, Metric: 's', rType: 2, wType: 3, channel: Constants.channels.PWMSettingsChannel, subchannel: Constants.channels.shutdownRampSubChannel },
    { Title: Constants.values.positiveRampForwardDirection, Value: 0, Min: 0, Max: 10000, Steps: 1, Metric: 's', rType: 2, wType: 3, channel: Constants.channels.standaloneSettingsChannel, subchannel: Constants.channels.positiveRampForwardDirectionSubChannel },
    { Title: Constants.values.negativeRampForwardDirection, Value: 0, Min: 0, Max: 10000, Steps: 1, Metric: 's', rType: 2, wType: 3, channel: Constants.channels.standaloneSettingsChannel, subchannel: Constants.channels.negativeRampForwardDirectionSubChannel },
    { Title: Constants.values.positiveRampReverseDirection, Value: 0, Min: 0, Max: 10000, Steps: 1, Metric: 's', rType: 2, wType: 3, channel: Constants.channels.standaloneSettingsChannel, subchannel: Constants.channels.positiveRampReverseDirectionSubChannel },
    { Title: Constants.values.negativeRampReverseDirection, Value: 0, Min: 0, Max: 10000, Steps: 1, Metric: 's', rType: 2, wType: 3, channel: Constants.channels.standaloneSettingsChannel, subchannel: Constants.channels.negativeRampReverseDirectionSubChannel }
  ];

  analogInputParameterItems = [
    { Title: 'MinInput', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'MaxInput', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'Warning(min)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'Warning(max)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'Alarm(min)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'Alarm(max)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' }
  ];
  analogInputParameterItemsPt100 = [

    { Title: 'Warning(min)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'Warning(max)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'Alarm(min)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' },
    { Title: 'Alarm(max)', Value: 0, Min: -10000, Max: 10000, Steps: 1, Metric: '' }
  ];



  pumpSetupItems = [
    { Title: Constants.values.forwardMinCurrent, Value: 0, Min: 50, Max: 1500, Steps: 1, Metric: 'mA', rType: 2, wType: 3, channel: 30, subchannel: 7 },
    { Title: Constants.values.forwardMaxCurrent, Value: 0, Min: 50, Max: 1500, Steps: 1, Metric: 'mA', rType: 2, wType: 3, channel: 30, subchannel: 8 },
    { Title: Constants.values.reverseMinCurrent, Value: 0, Min: 50, Max: 1500, Steps: 1, Metric: 'mA', rType: 2, wType: 3, channel: 30, subchannel: 9 },
    { Title: Constants.values.reverseMaxCurrent, Value: 0, Min: 50, Max: 1500, Steps: 1, Metric: 'mA', rType: 2, wType: 3, channel: 30, subchannel: 10 },
    { Title: Constants.values.coilResistance, Value: 0, Min: 1 , Max: 100 , Steps: 1 , Metric: 'ohm', rType: 2, wType: 3, channel: 30, subchannel: 4 },
    // { Title: 'PWM Frequency', Value: 100, Min: 100, Max: 10000, Steps: 100, Metric: 'Hz' }, --TBD
    { Title: Constants.values.ditherAmplitude, Value: 0, Min: 0, Max: 500, Steps: 1, Metric: 'mA', rType: 2, wType: 3, channel: 30, subchannel: 3 },
    { Title: Constants.values.ditherFrequency, Value: 0, Min: 50, Max: 1000, Steps: 1, Metric: 'Hz', rType: 2, wType: 3, channel: 30, subchannel: 2 },
    { Title: Constants.values.maxCurrentError, Value: 0, Min: 0, Max: 100, Steps: 1, Metric: '%', rType: 2, wType: 3, channel: 30, subchannel: 11 },
    // { Title: 'Limp Home Ramp Time', Value: 0, Min: 0, Max: 60, Steps: 1, Metric: 's', rType: 2, wType: 3, channel: 30, subchannel: 12 }
  ];

  liveTuneItems = [
    { 'name': Constants.values.liveGraphSetpointValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.setPointSubChannel },
    { 'name': Constants.values.liveGraphPressureValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.pressureSubChannel },
    { 'name': Constants.values.liveGraphSwashAngleValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.swashAngleSubChannel }
  ];

  static getLiveTuneValuesList(LiveTuneType) {
    let liveTunepValuesList = {
      'PressureRegulator': [
        { 'Title': Constants.values.pPartGain, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pPartGainPressureRegSubChannel, 'liveTuneStepChannel': Constants.channels.liveTuneStepChannel, 'liveTuneStepUpSubChannel': Constants.channels.pressurePpartUpSubChannel, 'liveTuneStepDownSubChannel': Constants.channels.pressurePpartDownSubChannel },
        { 'Title': Constants.values.iPartTime, Value: 0, Min: 0.5, Max: 10000, Steps: 0.1, Metric: 's', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.iPartTimePressureRegSubChannel, 'liveTuneStepChannel': Constants.channels.liveTuneStepChannel, 'liveTuneStepUpSubChannel': Constants.channels.pressureIpartUpSubChannel, 'liveTuneStepDownSubChannel': Constants.channels.pressureIpartDownSubChannel },
        { 'Title': Constants.values.dPartGain, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.dPartGainPressureRegSubChannel, 'liveTuneStepChannel': Constants.channels.liveTuneStepChannel, 'liveTuneStepUpSubChannel': Constants.channels.pressureDpartUpSubChannel, 'liveTuneStepDownSubChannel': Constants.channels.pressureDpartDownSubChannel }
      ],
      'SwashAngle': [
        { 'Title': Constants.values.pPartGain, Value: 0, Min: 0, Max: 1000, Steps: 1, Metric: '%', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.pPartGainSubChannel, 'liveTuneStepChannel': Constants.channels.liveTuneStepChannel, 'liveTuneStepUpSubChannel': Constants.channels.swashPpartUpSubChannel, 'liveTuneStepDownSubChannel': Constants.channels.swashPpartDownSubChannel },
        { 'Title': Constants.values.iPartTime, Value: 0, Min: 0.5, Max: 10000, Steps: 0.1, Metric: 's', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.iPartTimeSubChannel, 'liveTuneStepChannel': Constants.channels.liveTuneStepChannel, 'liveTuneStepUpSubChannel': Constants.channels.swashIpartUpSubChannel, 'liveTuneStepDownSubChannel': Constants.channels.swashIpartDownSubChannel }
      ]
    }
    if (LiveTuneType == 1) {
      console.log('LiveTuneType selected :PressureRegulator')
      return liveTunepValuesList.PressureRegulator;
    } else if (LiveTuneType == 2) {
      return liveTunepValuesList.SwashAngle;
    }
  }

  constructor(private alertCtrl: AlertController) {
    console.log('Hello PCMChannelDataService Provider');
  }

  /** 
  * This is used to get input values list
  * @returns {JSON} regulatorSetupInputList - The regularsetup data
  */
  static getInputDetails() {
    let regulatorSetupInputList = [
      { 'name': 'regulatorType', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.regTypeSubchannel },
      { 'name': 'feedForward', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.feedForwardSubchannel },
      { 'name': 'propotionalReg', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.propotionalRegSubchannel },
      { 'name': 'integrationReg', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.integrationRegSubchannel },
      { 'name': 'propotionalGain', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.propotionalGainSubchannel },
      { 'name': 'integrationTime', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.integrationTimeSubchannel },
      { 'name': 'maxFeedbackDeviation', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.maxFeedbackDeviationSubchannel },
    ]
    return regulatorSetupInputList;
  }


  /** 
   * This is used to get input values list
   * @returns {JSON} connectorSetupDetails - The connectorSetupDetails data
   */
  static getInputDetailsDeviceMainPage() {
    let deviceMainPageParameterInputList = [
      { 'name': Constants.values.pressureRegulator, 'rType': 2, 'wType': 3, 'channel': Constants.channels.pressurePIDRegChannel, 'subchannel': Constants.channels.pressureRegSubChannel },
      { 'name': Constants.values.swashAngle, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.sswashAngleSubChannel },
      { 'name': 'runMode', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.runModeSubChannel },
      { 'name': 'setPoint', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.setPointSubChannel },
      { 'name': 'pressure', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.pressureSubChannel },
      { 'name': 'swashAngle', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.swashAngleSubChannel },
      { 'name': 'firmwareVersion', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneSettingsChannel, 'subchannel': Constants.channels.firmwareVersion }
    ]
    return deviceMainPageParameterInputList;
  }

  /** 
  * This is used to get input values list
  * @returns {JSON} deviceMainPageParameterInputList - The deviceMainPageParameter data
  */
  static getconnectorSetupDetails(connector: string) {

    let connectorSetupDetails = {
      "LO": [
        { "pinNum": "1", "pinValue": "Do not connect", "channel" : 0 },
        { "pinNum": "2", "pinValue": "+24V power out", "channel" : 0 },
        { "pinNum": "3", "pinValue": "Ground out", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Do not connect", "channel" : 0 },
        { "pinNum": "5", "pinValue": "Do not connect", "channel" : 0 }
      ],
      "LI": [
        { "pinNum": "1", "pinValue": "Do not connect", "channel" : 0 },
        { "pinNum": "2", "pinValue": "+24V power in", "channel" : 0 },
        { "pinNum": "3", "pinValue": "Ground in", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Do not connect", "channel" : 0 },
        { "pinNum": "5", "pinValue": "Do not connect", "channel" : 0 }
      ],
      "PO": [
        { "pinNum": "1", "pinValue": "+24V I/O power out", "channel" : 0 },
        { "pinNum": "2", "pinValue": "+24V Pump power in", "channel" : 0 },
        { "pinNum": "3", "pinValue": "Ground I/O out", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Ground I/O out", "channel" : 0 }
      ],
      "PI": [
        { "pinNum": "1", "pinValue": "+24V I/O power in", "channel" : 0 },
        { "pinNum": "2", "pinValue": "+24V Pump power in", "channel" : 0 },
        { "pinNum": "3", "pinValue": "Ground I/O in", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Ground I/O in", "channel" : 0 }
      ],
      "O1": [
        { "pinNum": "1", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Pump out", "channel" : 0 },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Pump out", "channel" : 0 },
      ],
      "O2": [
        { "pinNum": "1", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Pump out", "channel" : 0 },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Pump out", "channel" : 0 },
      ],
      "AI": [
        { "pinNum": "1", "pinValue": "+24V power", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Analog in 1", "channel" : Constants.channels.standaloneAnalog1FunctionChannel },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Analog in 2", "channel" : Constants.channels.standaloneAnalog2FunctionChannel },
      ],
      "PT": [
        { "pinNum": "1", "pinValue": "PT100", "channel" : Constants.channels.standaloneFunctionPT100Channel },
        { "pinNum": "2", "pinValue": "PT100 + sense", "channel" : 0 },
        { "pinNum": "3", "pinValue": "PT100 -", "channel" : 0 },
        { "pinNum": "4", "pinValue": "PT100 - sense", "channel" : 0 },
      ],
      "X1": [
        { "pinNum": "1", "pinValue": "+24V power", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Analog in 3", "channel" : Constants.channels.standaloneAnalog3FunctionChannel },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Digital in 1", "channel" : Constants.channels.standaloneDigitalInput1FunctionChannel },
      ],
      "X2": [
        { "pinNum": "1", "pinValue": "+24V power", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Analog in 4", "channel" : Constants.channels.standaloneAnalog4FunctionChannel },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Digital in 2", "channel" : Constants.channels.standaloneDigitalInput2FunctionChannel },
      ],
      "X3": [
        { "pinNum": "1", "pinValue": "+24V power", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Analog in 5", "channel" : Constants.channels.standaloneAnalog5FunctionChannel },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Digital in 3", "channel" : Constants.channels.standaloneDigitalInput3FunctionChannel },
      ],
      "X4": [
        { "pinNum": "1", "pinValue": "+24V power", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Analog in 6", "channel" : Constants.channels.standaloneAnalog6FunctionChannel },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Digital in 4", "channel" : Constants.channels.standaloneDigitalInput4FunctionChannel },
      ],
      "DI": [
        { "pinNum": "1", "pinValue": "+24V power", "channel" : 0 },
        { "pinNum": "2", "pinValue": "Digital I/O 1", "channel" : Constants.channels.standaloneDigitalIO1FunctionChannel },
        { "pinNum": "3", "pinValue": "Digital I/O 2", "channel" : Constants.channels.standaloneDigitalIO2FunctionChannel },
        { "pinNum": "4", "pinValue": "Digital I/O 3", "channel" : Constants.channels.standaloneDigitalIO3FunctionChannel },
        { "pinNum": "5", "pinValue": "Digital I/O 4", "channel" : Constants.channels.standaloneDigitalIO4FunctionChannel }
      ],
      "DO": [
        { "pinNum": "1", "pinValue": "Digital I/O 5", "channel" : Constants.channels.standaloneDigitalIO5FunctionChannel },
        { "pinNum": "2", "pinValue": "Digital I/O 6", "channel" : Constants.channels.standaloneDigitalIO6FunctionChannel },
        { "pinNum": "3", "pinValue": "Ground I/O", "channel" : 0 },
        { "pinNum": "4", "pinValue": "Digital I/O 7", "channel" : Constants.channels.standaloneDigitalIO7FunctionChannel },
        { "pinNum": "5", "pinValue": "Digital I/O 8", "channel" : Constants.channels.standaloneDigitalIO8FunctionChannel }
      ],
      "USB": [
        { "pinNum": "", "pinValue": "Not Configurable", "channel" : 0  }
      ]

    }

    if (connector == Constants.values.LO) {
      return connectorSetupDetails.LO;
    } else if (connector == Constants.values.LI) {
      return connectorSetupDetails.LI;
    } else if (connector == Constants.values.O1) {
      return connectorSetupDetails.O1;
    } else if (connector == Constants.values.O2) {
      return connectorSetupDetails.O2;
    } else if (connector == Constants.values.PI) {
      return connectorSetupDetails.PI;
    } else if (connector == Constants.values.PO) {
      return connectorSetupDetails.PO;
    } else if (connector == Constants.values.AI) {
      return connectorSetupDetails.AI;
    } else if (connector == Constants.values.PT) {
      return connectorSetupDetails.PT;
    } else if (connector == Constants.values.X1) {
      return connectorSetupDetails.X1;
    } else if (connector == Constants.values.X2) {
      return connectorSetupDetails.X2;
    } else if (connector == Constants.values.X3) {
      return connectorSetupDetails.X3;
    } else if (connector == Constants.values.X4) {
      return connectorSetupDetails.X4
    } else if (connector == Constants.values.DI) {
      return connectorSetupDetails.DI;
    } else if (connector == Constants.values.DO) {
      return connectorSetupDetails.DO;
    } else if (connector == Constants.values.USB) {
      return connectorSetupDetails.USB;
    }

  }


  /** 
 * This is used to get connector parameter function input dropdown list
 * @returns {JSON} connectorParameterSetupDetails - The connectorParameterSetupDetails data
 */
  static getconnectorParameterDropdownList(connector: string) {
    let connectorParameterSetupDetails = {
      "AI": [
        { "value": "0", "name": "Disabled" },
        { "value": "1", "name": "Setpoint input" },
        { "value": "2", "name": "Swash angle input" },
        { "value": "3", "name": "Work pressure input" },
        { "value": "4", "name": "Threshold" },
        { "value": "5", "name": "Threshold temp" }
      ],
      "DI": [
        { "value": "0", "name": "Disabled" },
        { "value": "1", "name": "Start drive" },
        { "value": "2", "name": "Reverse drive" },
        { "value": "3", "name": "Swash angle regulator enable" },
        { "value": "4", "name": "Pressure regulator enable" },
        { "value": "5", "name": "Monitor input signal" },
        { "value": "6", "name": "Quickstop input" },
        { "value": "7", "name": "Warning input" },
        { "value": "8", "name": "Temperature warning input" },
        { "value": "9", "name": "Alarm input" },
        { "value": "19", "name": "Disable Bluetooth input" }
      ], "PT": [
        { "value": "0", "name": "Disabled" },
        { "value": "5", "name": "Threshold temp" }
      ],
      "DIO": [
        { "value": "0", "name": "Disabled" },
        { "value": "1", "name": "Start drive" },
        { "value": "2", "name": "Reverse drive" },
        { "value": "3", "name": "Swash angle regulator enable" },
        { "value": "4", "name": "Pressure regulator enable" },
        { "value": "5", "name": "Monitor input signal" },
        { "value": "6", "name": "Quickstop input" },
        { "value": "7", "name": "Warning input" },
        { "value": "8", "name": "Temperature warning input" },
        { "value": "9", "name": "Alarm input" },
        { "value": "10", "name": "Alarm output" },
        { "value": "11", "name": "Warning output" },
        { "value": "12", "name": "Temperature warning output" },
        { "value": "13", "name": "Drive started output" },
        { "value": "14", "name": "Drive forward output" },
        { "value": "15", "name": "Drive reverse output" },
        { "value": "16", "name": "Swash reg active output" },
        { "value": "17", "name": "Pressure reg active output" },
        { "value": "18", "name": "Quickstop active output" },
        { "value": "19", "name": "Disable Bluetooth input" }
      ]
    }
    if (connector == Constants.values.AI) {
      return connectorParameterSetupDetails.AI;
    } else if (connector == Constants.values.DI) {
      return connectorParameterSetupDetails.DI;
    } else if (connector == Constants.values.PT) {
      return connectorParameterSetupDetails.PT;
    } else if (connector == Constants.values.DIO) {
      return connectorParameterSetupDetails.DIO;
    }

  }

  /** 
 * This is used to get analog sensor unit  dropdown list
 * @returns {JSON} AnalogSensorUnitDetails - The AnalogSensorUnit data
 */
  static getAnalogSensorUnitDropdownList(functionInputAnalog: number) {
    let analogUnitDropdownList = {
      "thresholdTemp": [
        // { "value": "0", "name": "None" },
        { "value": "1", "name": "C" },
        { "value": "2", "name": "F" },
      ],
      "workPressureInput": [
        // { "value": "0", "name": "None" },
        { "value": "3", "name": "Bar" },
        { "value": "4", "name": "Psi" },
        { "value": "5", "name": "Mpa" }

      ], "threshold": [
        // { "value": "0", "name": "None" },
        { "value": "3", "name": "Bar" },
        { "value": "4", "name": "Psi" },
        { "value": "5", "name": "Mpa" },
        { "value": "6", "name": "Rpm" },
        { "value": "7", "name": "L" },
        { "value": "8", "name": "L/min" }
      ]
    }
    if (functionInputAnalog == Constants.values.thresholdTemp) {
      return analogUnitDropdownList.thresholdTemp;
    } else if (functionInputAnalog == Constants.values.workPressureInput) {
      return analogUnitDropdownList.workPressureInput;
    } else if (functionInputAnalog == Constants.values.threshold) {
      return analogUnitDropdownList.threshold;
    }
  }


  /** 
 * This is used to get analog sensor unit  dropdown list
 * @returns {JSON} AnalogSensorUnitDetails - The AnalogSensorUnit data
 */
  static getAnalogDisplayUnitDropdownList(sensorInput: number) {
    let analogUnitDropdownList = {
      "temperature": [

        { "value": "1", "name": "C" },
        { "value": "2", "name": "F" },
      ],
      "pressure": [
        { "value": "3", "name": "Bar" },
        { "value": "4", "name": "Psi" },
        { "value": "5", "name": "Mpa" }

      ], "rotationalSpeed": [

        { "value": "6", "name": "Rpm" }

      ], "volume": [

        { "value": "7", "name": "L" }
      ],
      "flow": [
        { "value": "8", "name": "L/min" }
      ]
    }
    if (sensorInput == Constants.values.BarUnitValue || sensorInput == Constants.values.PsiUnitValue || sensorInput == Constants.values.MpaUnitValue) {

      return analogUnitDropdownList.pressure;
    }
    else if (sensorInput == Constants.values.CelsiusUnitValue || sensorInput == Constants.values.FahrenheitUnitValue) {
      return analogUnitDropdownList.temperature;
    }
    else if (sensorInput == Constants.values.RpmUnitValue) {
      return analogUnitDropdownList.rotationalSpeed;
    }
    else if (sensorInput == Constants.values.LUnitValue) {
      return analogUnitDropdownList.volume;
    }
    else if (sensorInput == Constants.values.LPerMinUnitValue) {
      return analogUnitDropdownList.flow;
    }
  }


  /** 
 * This is used to get connector parameter values list
 * @returns {JSON} connectorParameterSetupDetails - The connectorParameterSetupDetails data
 */
  static getconnectorParameterSetupValuesList(connectorPinType: string, channel) {
    // let connectorParamterSetupValuesList = {
    //   "AnalogIn1": [
    //     { 'name': 'alarmMin', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog1FunctionChannel, 'subchannel': Constants.channels.alarmMinSubchannel },
    //     { 'name': 'alarmMax', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog1FunctionChannel, 'subchannel': Constants.channels.alarmMaxSubchannel },
    //     { 'name': 'warnMin', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog1FunctionChannel, 'subchannel': Constants.channels.warnMinSubchannel },
    //     { 'name': 'warnMax', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog1FunctionChannel, 'subchannel': Constants.channels.warnMaxSubchannel }
    //   ],
    //   "AnalogIn2": [
    //     { 'name': 'alarmMin', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog2FunctionChannel, 'subchannel': Constants.channels.alarmMinSubchannel },
    //     { 'name': 'alarmMax', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog2FunctionChannel, 'subchannel': Constants.channels.alarmMaxSubchannel },
    //     { 'name': 'warnMin', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog2FunctionChannel, 'subchannel': Constants.channels.warnMinSubchannel },
    //     { 'name': 'warnMax', 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneAnalog2FunctionChannel, 'subchannel': Constants.channels.warnMaxSubchannel }
    //   ]
    // }

    let connectorParamterSetupValuesList = {
      "AnalogIn": [
        { 'name': 'minInput', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.minInputSubchannel },
        { 'name': 'maxInput', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.maxInputSubchannel },
        { 'name': 'sensorUnit', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.sensorUnitSubchannel },
        { 'name': 'warnMin', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.warnMinSubchannel },
        { 'name': 'warnMax', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.warnMaxSubchannel },
        { 'name': 'alarmMin', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.alarmMinSubchannel },
        { 'name': 'alarmMax', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.alarmMaxSubchannel }
      ], "PT100": [
        { 'name': 'sensorUnit', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.sensorUnitSubchannel },
        { 'name': 'warnMin', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.warnMinSubchannel },
        { 'name': 'warnMax', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.warnMaxSubchannel },
        { 'name': 'alarmMin', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.alarmMinSubchannel },
        { 'name': 'alarmMax', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.alarmMaxSubchannel }
      ],
      "DigitalIn": [
        { 'name': 'inverted', 'rType': 2, 'wType': 3, 'channel': channel, 'subchannel': Constants.channels.invertedSubchannel }
      ]

    }
    if (connectorPinType == Constants.values.AnalogIn || connectorPinType == Constants.values.PT100) {
      return connectorParamterSetupValuesList.AnalogIn;
    } else if (connectorPinType == Constants.values.PT100) {
      return connectorParamterSetupValuesList.PT100;
    } else if (connectorPinType == Constants.values.DigitalIn) {
      return connectorParamterSetupValuesList.DigitalIn;
    }


  }


  /** 
* This is used to get the calibration parameter values list
@param buttonName - Button name , on which the user has clicked on
* @returns {JSON} calibrationParamterSetupValuesList - The connectorParameterSetupDetails data
*/
  static deviceSetupFunctionality(buttonName) {
    let buttonParamterSetupValuesList = {
      "FactoryReset": { 'name': Constants.values.FactoryReset, 'rType': 2, 'wType': 3, 'channel': Constants.channels.eepromFunctionChannel, 'subchannel': Constants.channels.factoryResetSubChannel },
      "SaveToEeprom": { 'name': Constants.values.SaveToEeprom, 'rType': 2, 'wType': 3, 'channel': Constants.channels.eepromFunctionChannel, 'subchannel': Constants.channels.saveToEepromSubChannel },
      "LoadFromEeprom": { 'name': Constants.values.LoadFromEeprom, 'rType': 2, 'wType': 3, 'channel': Constants.channels.eepromFunctionChannel, 'subchannel': Constants.channels.loadFromEepromSubChannel }
    }

    if (buttonName == buttonParamterSetupValuesList.FactoryReset.name) {
      return buttonParamterSetupValuesList.FactoryReset;
    } else if (buttonName == buttonParamterSetupValuesList.SaveToEeprom.name) {
      return buttonParamterSetupValuesList.SaveToEeprom;
    } else if (buttonName == buttonParamterSetupValuesList.LoadFromEeprom.name) {
      return buttonParamterSetupValuesList.LoadFromEeprom;
    }
  }


  /** 
* This is used to get the calibration parameter values list
* @returns {JSON} calibrationParamterSetupValuesList - The connectorParameterSetupDetails data
*/
  static calibrateconnectorParameterSetupValuesList(connectorPinValue) {

    let calibrationParamterSetupValuesList = {
      "AnalogIn1": { 'name': Constants.values.AnalogIn1Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.calibrateAnalogInput, 'subchannel': Constants.channels.analogIn1SubChannel, 'metric': ' mA', 'values': [4, 20] },
      "AnalogIn2": { 'name': Constants.values.AnalogIn2Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.calibrateAnalogInput, 'subchannel': Constants.channels.analogIn2SubChannel, 'metric': ' mA', 'values': [4, 20] },
      "AnalogIn3": { 'name': Constants.values.AnalogIn3Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.calibrateAnalogInput, 'subchannel': Constants.channels.analogIn3SubChannel, 'metric': ' mA', 'values': [4, 20] },
      "AnalogIn4": { 'name': Constants.values.AnalogIn4Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.calibrateAnalogInput, 'subchannel': Constants.channels.analogIn4SubChannel, 'metric': ' mA', 'values': [4, 20] },
      "AnalogIn5": { 'name': Constants.values.AnalogIn5Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.calibrateAnalogInput, 'subchannel': Constants.channels.analogIn5SubChannel, 'metric': ' mA', 'values': [4, 20] },
      "AnalogIn6": { 'name': Constants.values.AnalogIn6Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.calibrateAnalogInput, 'subchannel': Constants.channels.analogIn6SubChannel, 'metric': ' mA', 'values': [4, 20] },
      "PT100": { 'name': Constants.values.PT100, 'rType': 2, 'wType': 3, 'channel': Constants.channels.calibratePt100, 'subchannel': Constants.channels.pt100SubChannel, 'metric': ' C', 'values': [0, 100] }
    }

    if (connectorPinValue == calibrationParamterSetupValuesList.AnalogIn1.name) {
      return calibrationParamterSetupValuesList.AnalogIn1;
    } else if (connectorPinValue == calibrationParamterSetupValuesList.AnalogIn2.name) {
      return calibrationParamterSetupValuesList.AnalogIn2;
    } else if (connectorPinValue == calibrationParamterSetupValuesList.AnalogIn3.name) {
      return calibrationParamterSetupValuesList.AnalogIn3;
    } else if (connectorPinValue == calibrationParamterSetupValuesList.AnalogIn4.name) {
      return calibrationParamterSetupValuesList.AnalogIn4;
    } else if (connectorPinValue == calibrationParamterSetupValuesList.AnalogIn5.name) {
      return calibrationParamterSetupValuesList.AnalogIn5;
    } else if (connectorPinValue == calibrationParamterSetupValuesList.AnalogIn6.name) {
      return calibrationParamterSetupValuesList.AnalogIn6;
    } else if (connectorPinValue.indexOf(calibrationParamterSetupValuesList.PT100.name) >= 0) { //Only for testing. Need to change - Anu 10/8/2017 
      return calibrationParamterSetupValuesList.PT100;
    }


  }

  static getLiveTuneInputDetails() {
    let liveTuneInputList = [
      { 'name': Constants.values.liveGraphSetpointValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphSetpointChannel, 'subchannel': Constants.channels.liveGraphSetpointSubhannel },
      { 'name': Constants.values.liveGraphPressureValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphPressureChannel, 'subchannel': Constants.channels.liveGraphPressureSubhannel },
      { 'name': Constants.values.liveGraphSwashAngleValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphSwashAngleChannel, 'subchannel': Constants.channels.liveGraphSwashAngleSubhannel },
      { 'name': 'propotionalGain', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.propotionalGainSubchannel },
      { 'name': 'integrationTime', 'rType': 2, 'wType': 3, 'channel': Constants.channels.PWMSettingsChannel, 'subchannel': Constants.channels.integrationTimeSubchannel },

    ]
    return liveTuneInputList;
  }

  /** 
* This is used to get the live graph parameter values 
* @returns {JSON} liveGraphParameterSetupValues - The live Graph Parameter Setup Details data
*/
  static liveGraphParameterSetupValues(liveGraphType) {
    console.log('liveGraphType ' + String(liveGraphType));
    // let liveGraphParamterSetupValuesList = [

    //   { 'name': Constants.values.liveGraphSetpointValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphSetpointChannel, 'subchannel': Constants.channels.liveGraphSetpointSubhannel, 'divisor': 100 },
    //   { 'name': Constants.values.liveGraphPressureValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphPressureChannel, 'subchannel': Constants.channels.liveGraphPressureSubhannel, 'divisor': 1 },
    //   { 'name': Constants.values.liveGraphSwashAngleValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphSwashAngleChannel, 'subchannel': Constants.channels.liveGraphSwashAngleSubhannel, 'divisor': 100 },
    //   { 'name': Constants.values.liveGraphPumpCurrentValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphPumpCurrentChannel, 'subchannel': Constants.channels.liveGraphPumpCurrentSubhannel, 'divisor': 10 },
    //   { 'name': Constants.values.liveGraphAnalogInput1Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphAnalogInput1Channel, 'subchannel': Constants.channels.liveGraphAnalogInput1Subhannel, 'divisor': 1000 },
    //   { 'name': Constants.values.liveGraphAnalogInput2Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphAnalogInput2Channel, 'subchannel': Constants.channels.liveGraphAnalogInput2Subhannel, 'divisor': 1000 },
    //   { 'name': Constants.values.liveGraphAnalogInput3Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphAnalogInput3Channel, 'subchannel': Constants.channels.liveGraphAnalogInput3Subhannel, 'divisor': 1000 },
    //   { 'name': Constants.values.liveGraphAnalogInput4Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphAnalogInput4Channel, 'subchannel': Constants.channels.liveGraphAnalogInput4Subhannel, 'divisor': 1000 },
    //   { 'name': Constants.values.liveGraphAnalogInput5Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphAnalogInput5Channel, 'subchannel': Constants.channels.liveGraphAnalogInput5Subhannel, 'divisor': 1000 },
    //   { 'name': Constants.values.liveGraphAnalogInput6Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphAnalogInput6Channel, 'subchannel': Constants.channels.liveGraphAnalogInput6Subhannel, 'divisor': 1000 },
    //   { 'name': Constants.values.liveGraphPT100Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphPT100Channel, 'subchannel': Constants.channels.liveGraphPT100Subhannel, 'divisor': 1 }
    // ];

    let liveGraphParamterSetupValuesList = {
       'Setpoint': { 'name': Constants.values.liveGraphSetpointValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphSetpointChannel, 'subchannel': Constants.channels.liveGraphSetpointSubhannel, 'min': -100, 'max': 100, 'divisor': 100 },
      'Pressure': { 'name': Constants.values.liveGraphPressureValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphPressureChannel, 'subchannel': Constants.channels.liveGraphPressureSubhannel, 'min': 0, 'max': 450, 'divisor': 1000 },
      'SwashAngle': { 'name': Constants.values.liveGraphSwashAngleValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphSwashAngleChannel, 'subchannel': Constants.channels.liveGraphSwashAngleSubhannel, 'min': -100, 'max': 100, 'divisor': 100 },
      'PumpCurrent': { 'name': Constants.values.liveGraphPumpCurrentValue, 'rType': 2, 'wType': 3, 'channel': Constants.channels.liveGraphPumpCurrentChannel, 'subchannel': Constants.channels.liveGraphPumpCurrentSubhannel, 'min': -2000, 'max': 2000, 'divisor': 10 },
      'AnalogIn1': { 'name': Constants.values.liveGraphAnalogInput1Value, 'rType': 2, 'wType': 3,'powerchannel': Constants.channels.liveGraphAnalogInput1Channel, 'channel': Constants.channels.standaloneAnalog1FunctionChannel, 'subchannel': Constants.channels.liveGraphAnalogInput1Subhannel, 'min': 0, 'max': 25, 'divisor': 1000 },
      'AnalogIn2': { 'name': Constants.values.liveGraphAnalogInput2Value, 'rType': 2, 'wType': 3,'powerchannel': Constants.channels.liveGraphAnalogInput2Channel, 'channel': Constants.channels.standaloneAnalog2FunctionChannel, 'subchannel': Constants.channels.liveGraphAnalogInput2Subhannel, 'min': 0, 'max': 25, 'divisor': 1000 },
      'AnalogIn3': { 'name': Constants.values.liveGraphAnalogInput3Value, 'rType': 2, 'wType': 3,'powerchannel': Constants.channels.liveGraphAnalogInput3Channel, 'channel': Constants.channels.standaloneAnalog3FunctionChannel, 'subchannel': Constants.channels.liveGraphAnalogInput3Subhannel, 'min': 0, 'max': 25, 'divisor': 1000 },
      'AnalogIn4': { 'name': Constants.values.liveGraphAnalogInput4Value, 'rType': 2, 'wType': 3,'powerchannel': Constants.channels.liveGraphAnalogInput4Channel, 'channel': Constants.channels.standaloneAnalog4FunctionChannel, 'subchannel': Constants.channels.liveGraphAnalogInput4Subhannel, 'min': 0, 'max': 25, 'divisor': 1000 },
      'AnalogIn5': { 'name': Constants.values.liveGraphAnalogInput5Value, 'rType': 2, 'wType': 3,'powerchannel': Constants.channels.liveGraphAnalogInput5Channel, 'channel': Constants.channels.standaloneAnalog5FunctionChannel, 'subchannel': Constants.channels.liveGraphAnalogInput5Subhannel, 'min': 0, 'max': 25, 'divisor': 1000 },
      'AnalogIn6': { 'name': Constants.values.liveGraphAnalogInput6Value, 'rType': 2, 'wType': 3,'powerchannel': Constants.channels.liveGraphAnalogInput6Channel, 'channel': Constants.channels.standaloneAnalog6FunctionChannel, 'subchannel': Constants.channels.liveGraphAnalogInput6Subhannel, 'min': 0, 'max': 25, 'divisor': 1000 },
      'PT100': { 'name': Constants.values.liveGraphPT100Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneFunctionPT100Channel, 'subchannel': Constants.channels.liveGraphPT100Subhannel, 'min': 0, 'max': 25, 'divisor': 1000 }      // 'PT100': { 'name': Constants.values.liveGraphPT100Value, 'rType': 2, 'wType': 3, 'channel': Constants.channels.standaloneFunctionPT100Channel, 'subchannel': Constants.channels.liveGraphPT100Subhannel, 'min': -30, 'max': 150, 'divisor': 10 }
    };

    

    // liveGraphParamterSetupValuesList.forEach(element => {
    //   if (liveGraphType == element.name) {
    //     console.log('element.name:' + element.name);
    //     console.log('element.channel:' + element.channel);
    //     console.log('element.channel:' + element.subchannel);
    //     return element;
    //    }
    // });
    if (liveGraphType == liveGraphParamterSetupValuesList.Setpoint.name) {
      return liveGraphParamterSetupValuesList.Setpoint;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.SwashAngle.name) {
      return liveGraphParamterSetupValuesList.SwashAngle;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.PumpCurrent.name) {
      return liveGraphParamterSetupValuesList.PumpCurrent;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.Pressure.name) {
      return liveGraphParamterSetupValuesList.Pressure;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.AnalogIn1.name) {
      return liveGraphParamterSetupValuesList.AnalogIn1;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.AnalogIn2.name) {
      return liveGraphParamterSetupValuesList.AnalogIn2;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.AnalogIn3.name) {
      return liveGraphParamterSetupValuesList.AnalogIn3;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.AnalogIn4.name) {
      return liveGraphParamterSetupValuesList.AnalogIn4;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.AnalogIn5.name) {
      return liveGraphParamterSetupValuesList.AnalogIn5;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.AnalogIn6.name) {
      return liveGraphParamterSetupValuesList.AnalogIn6;
    } else if (liveGraphType == liveGraphParamterSetupValuesList.PT100.name) {
      return liveGraphParamterSetupValuesList.PT100;
    } else if (liveGraphType == "All") {
      return liveGraphParamterSetupValuesList;
    }

  }

  /** 
 * This is used for incrementing the value clicked
 * @param {any} header - header value  
 * @param {any} subHeader - subHeader value  
 */
  presentAlert(header, subHeader) {
    this.alert = this.alertCtrl.create({
      title: header,
      subTitle: subHeader,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: Constants.messages.ok,
          handler: data => {
            this.alert = null;
          }
        }]
    });
    this.alert.present();
  }

  /** 
  * This is used to get input values list
  * @returns {JSON} regulatorSetupInputList - The regularsetup data
  */
  static getAlarmAndWarnInputDetails() {
    let alarmAndWarnInputList = [
      { 'name': 'Alarms', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.alarmsSubchannel },
      { 'name': 'HardwareAlarms', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.hardwareAlarmsSubchannel },
      { 'name': 'Warnings', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.warningsSubchannel },
      { 'name': 'TempWarnings', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.tempWarningsSubchannel },
      { 'name': 'Alarms', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.alarmsLogSubchannel },
      { 'name': 'HardwareAlarms', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.hardwareAlarmsLogSubchannel },
      { 'name': 'Warnings', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.warningsLogSubchannel },
      { 'name': 'TempWarnings', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.tempWarningsLogSubchannel },
      { 'name': 'WarningsExtended', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.warningsExtendedSubchannel },
      { 'name': 'WarningsExtended', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.warningsExtendedLogSubchannel },
      { 'name': 'AlarmsExtended', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.alarmsExtendedSubchannel },
      { 'name': 'AlarmsExtended', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.alarmsExtendedLogSubchannel }
    ]
    return alarmAndWarnInputList;
  }


  /** 
 * This is used to get input values list
 * @returns {JSON} regulatorSetupInputList - The regularsetup data
 */
  static getLogInputDetails() {
    let logInputList = [
      { 'name': 'Alarms', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.alarmsLogSubchannel },
      { 'name': 'HardwareAlarms', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.hardwareAlarmsLogSubchannel },
      { 'name': 'Warnings', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.warningsLogSubchannel },
      { 'name': 'TempWarnings', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.tempWarningsLogSubchannel },
      { 'name': 'AlarmsExtended', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.alarmsExtendedLogSubchannel },
      { 'name': 'WarningsExtended', 'rType': 2, 'wType': 3, 'channel': Constants.channels.alarmCommunucationChannel, 'subchannel': Constants.channels.warningsExtendedLogSubchannel }
    ]
    return logInputList;
  }





  /** 
  * This is used to get connector parameter function input dropdown list
  * @returns {JSON} connectorParameterSetupDetails - The connectorParameterSetupDetails data
  */
  static getAlarmsListMap(alarmType: string) {
    let alarmsListMap = {
      'Alarms': [
        { 'value': '1', 'name': 'Analog 1 min alarm', 'listnumber': '33' },
        { 'value': '2', 'name': 'Analog 2 min alarm', 'listnumber': '34' },
        { 'value': '3', 'name': 'Analog 3 min alarm', 'listnumber': '35' },
        { 'value': '4', 'name': 'Analog 4 min alarm', 'listnumber': '36' },
        { 'value': '5', 'name': 'Analog 5 min alarm', 'listnumber': '37' },
        { 'value': '6', 'name': 'Analog 6 min alarm', 'listnumber': '38' },
        { 'value': '7', 'name': 'Undefined', 'listnumber': '39' },
        { 'value': '8', 'name': 'Undefined', 'listnumber': '40' },
        { 'value': '9', 'name': 'Analog 1 max alarm', 'listnumber': '41' },
        { 'value': '10', 'name': 'Analog 2 max alarm', 'listnumber': '42' },
        { 'value': '11', 'name': 'Analog 3 max alarm', 'listnumber': '43' },
        { 'value': '12', 'name': 'Analog 4 max alarm', 'listnumber': '44' },
        { 'value': '13', 'name': 'Analog 5 max alarm', 'listnumber': '45' },
        { 'value': '14', 'name': 'Analog 6 max alarm', 'listnumber': '46' },
        { 'value': '15', 'name': 'Undefined', 'listnumber': '47' },
        { 'value': '16', 'name': 'Undefined', 'listnumber': '48' },
        { 'value': '17', 'name': 'X1 digital 1 alarm', 'listnumber': '49' },
        { 'value': '18', 'name': 'X2 digital 2 alarm', 'listnumber': '50' },
        { 'value': '19', 'name': 'X3 digital 3 alarm', 'listnumber': '51' },
        { 'value': '20', 'name': 'X4 digital 4 alarm', 'listnumber': '52' },
        { 'value': '21', 'name': 'DI digital 1 I/O alarm', 'listnumber': '53' },
        { 'value': '22', 'name': 'DI digital 2 I/O alarm', 'listnumber': '54' },
        { 'value': '23', 'name': 'DI digital 3 I/O alarm', 'listnumber': '55' },
        { 'value': '24', 'name': 'DI digital 4 I/O alarm', 'listnumber': '56' },
        { 'value': '25', 'name': 'DO digital 1 I/O alarm', 'listnumber': '57' },
        { 'value': '26', 'name': 'DO digital 2 I/O alarm', 'listnumber': '58' },
        { 'value': '27', 'name': 'DO digital 3 I/O alarm', 'listnumber': '59' },
        { 'value': '28', 'name': 'DO digital 4 I/O alarm', 'listnumber': '60' },
        { 'value': '29', 'name': 'Undefined', 'listnumber': '61' },
        { 'value': '30', 'name': 'Setpoint singal outside limits', 'listnumber': '62' },
        { 'value': '31', 'name': 'PT100 min alarm', 'listnumber': '63' },
        { 'value': '32', 'name': 'PT100 max alarm', 'listnumber': '64' },
      ],
      'HardwareAlarms': [
        { 'value': '1', 'name': 'Bridge error', 'listnumber': '1' },
        { 'value': '2', 'name': 'Undefined', 'listnumber': '2' },
        { 'value': '3', 'name': 'Undefined', 'listnumber': '3' },
        { 'value': '4', 'name': 'Flash memory error', 'listnumber': '4' },
        { 'value': '5', 'name': 'Pump coil current error', 'listnumber': '5' },
        { 'value': '6', 'name': 'Pump coil output short circuit', 'listnumber': '6' },
        { 'value': '7', 'name': 'Undefined', 'listnumber': '7' },
        { 'value': '8', 'name': 'Pump coil driver error', 'listnumber': '8' },
        { 'value': '9', 'name': 'Pump coil open circuit', 'listnumber': '9' },
        { 'value': '10', 'name': 'No swash angle input selected', 'listnumber': '10' },
        { 'value': '11', 'name': 'No swash angle regulator enable selected', 'listnumber': '11' },
        { 'value': '12', 'name': 'No work pressure input selected', 'listnumber': '12' },
        { 'value': '13', 'name': 'No pressure regulator enable selected', 'listnumber': '13' },
        { 'value': '14', 'name': 'Undefined', 'listnumber': '14' },
        { 'value': '15', 'name': 'X1 digital input 1 monitor lost', 'listnumber': '15' },
        { 'value': '16', 'name': 'X2 digital input 2 monitor lost', 'listnumber': '16' },
        { 'value': '17', 'name': 'X3 digital input 3 monitor lost', 'listnumber': '17' },
        { 'value': '18', 'name': 'X4 digital input 4 monitor lost', 'listnumber': '18' },
        { 'value': '19', 'name': 'DI digital input I/O 1 monitor lost', 'listnumber': '19' },
        { 'value': '20', 'name': 'DI digital input I/O 2 monitor lost', 'listnumber': '20' },
        { 'value': '21', 'name': 'DI digital input I/O 3 monitor lost', 'listnumber': '21' },
        { 'value': '22', 'name': 'DI digital input I/O 4 monitor lost', 'listnumber': '22' },
        { 'value': '23', 'name': 'DO digital input I/O 1 monitor lost', 'listnumber': '23' },
        { 'value': '24', 'name': 'DO digital input I/O 2 monitor lost', 'listnumber': '24' },
        { 'value': '25', 'name': 'DO digital input I/O 3 monitor lost', 'listnumber': '25' },
        { 'value': '26', 'name': 'DO digital input I/O 4 monitor lost', 'listnumber': '26' },
        { 'value': '27', 'name': 'Pump power too low', 'listnumber': '27' },
        { 'value': '28', 'name': 'I/O power too low', 'listnumber': '28' },
        { 'value': '29', 'name': 'Control power too', 'listnumber': '29' },
        { 'value': '30', 'name': 'Control power high', 'listnumber': '30' },
        { 'value': '31', 'name': 'MCU temperature too high', 'listnumber': '31' },
        { 'value': '32', 'name': 'Undefined', 'listnumber': '32' }
      ],
      'AlarmsExtended': [
        { 'value': '1', 'name': 'Pump power too high', 'listnumber': '65' },
        { 'value': '2', 'name': 'I/O power too high', 'listnumber': '66' },
        { 'value': '3', 'name': 'Pump driver temp to high', 'listnumber': '67' },
        { 'value': '4', 'name': 'Pump driver temp to low', 'listnumber': '68' },
        { 'value': '5', 'name': 'I/O temp too high', 'listnumber': '69' },
        { 'value': '6', 'name': 'I/O temp too low', 'listnumber': '70' },
        { 'value': '7', 'name': 'undefined', 'listnumber': '71' },
        { 'value': '8', 'name': 'Control temp too low', 'listnumber': '72' },
        { 'value': '9', 'name': 'Pump driver over heated', 'listnumber': '73' },
        { 'value': '10', 'name': 'EEPROM commmunication error', 'listnumber': '74' },
        { 'value': '11', 'name': 'EEPROM memory data loss error', 'listnumber': '75' },
      ],
      'Warnings': [
        { 'value': '1', 'name': 'Analog 1 min warn', 'listnumber': '1' },
        { 'value': '2', 'name': 'Analog 2 min warn', 'listnumber': '2' },
        { 'value': '3', 'name': 'Analog 3 min warn', 'listnumber': '3' },
        { 'value': '4', 'name': 'Analog 4 min warn', 'listnumber': '4' },
        { 'value': '5', 'name': 'Analog 5 min warn', 'listnumber': '5' },
        { 'value': '6', 'name': 'Analog 6 min warn', 'listnumber': '6' },
        { 'value': '7', 'name': 'No configuration found in memory', 'listnumber': '7' },
        { 'value': '8', 'name': 'Password has not been changed from factory setting', 'listnumber': '8' },
        { 'value': '9', 'name': 'Analog 1 max warn', 'listnumber': '9' },
        { 'value': '10', 'name': 'Analog 2 max warn', 'listnumber': '10' },
        { 'value': '11', 'name': 'Analog 3 max warn', 'listnumber': '11' },
        { 'value': '12', 'name': 'Analog 4 max warn', 'listnumber': '12' },
        { 'value': '13', 'name': 'Analog 5 max warn', 'listnumber': '13' },
        { 'value': '14', 'name': 'Analog 6 max warn', 'listnumber': '14' },
        { 'value': '15', 'name': 'Undefined', 'listnumber': '15' },
        { 'value': '16', 'name': 'Undefined', 'listnumber': '16' },
        { 'value': '17', 'name': 'X1 digital 1 warn', 'listnumber': '17' },
        { 'value': '18', 'name': 'X2 digital 2 warn', 'listnumber': '18' },
        { 'value': '19', 'name': 'X3 digital 3 warn', 'listnumber': '19' },
        { 'value': '20', 'name': 'X4 digital 4 warn', 'listnumber': '20' },
        { 'value': '21', 'name': 'DI digital I/O 1 warn', 'listnumber': '21' },
        { 'value': '22', 'name': 'DI digital I/O 2 warn', 'listnumber': '22' },
        { 'value': '23', 'name': 'DI digital I/O 3 warn', 'listnumber': '23' },
        { 'value': '24', 'name': 'DI digital I/O 4 warn', 'listnumber': '24' },
        { 'value': '25', 'name': 'DO digital I/O 1 warn', 'listnumber': '25' },
        { 'value': '26', 'name': 'DO digital I/O 2 warn', 'listnumber': '26' },
        { 'value': '27', 'name': 'DO digital I/O 3 warn', 'listnumber': '27' },
        { 'value': '28', 'name': 'DO digital I/O 4 warn', 'listnumber': '28' },
        { 'value': '29', 'name': 'Swash angle input has a bad signal level', 'listnumber': '29' },
        { 'value': '30', 'name': 'Error too high for swash angle regulation', 'listnumber': '30' },
        { 'value': '31', 'name': 'Work pressure input has a bad signal level', 'listnumber': '31' },
        { 'value': '32', 'name': 'Error too high for pressure regulation', 'listnumber': '32' },
      ],
      'WarningsExtended': [
        { 'value': '1', 'name': 'AI Analog input 1 bad signal level warning', 'listnumber': '65' },
        { 'value': '2', 'name': 'AI Analog input 2 bad signal level warning', 'listnumber': '66' },
        { 'value': '3', 'name': 'X1 Analog input 3 bad signal level warning', 'listnumber': '67' },
        { 'value': '4', 'name': 'X2 Analog input 4 bad signal level warning', 'listnumber': '68' },
        { 'value': '5', 'name': 'X3 Analog input 5 bad signal level warning', 'listnumber': '69' },
        { 'value': '6', 'name': 'X4 Analog input 6 bad signal level warning', 'listnumber': '70' },
        { 'value': '7', 'name': 'PT100 bad signal level warning', 'listnumber': '71' },
        { 'value': '8', 'name': 'Al over current on +24V out', 'listnumber': '72' },
        { 'value': '9', 'name': 'X1 over current on +24V out', 'listnumber': '73' },
        { 'value': '10', 'name': 'X2 over current on +24V out', 'listnumber': '74' },
        { 'value': '11', 'name': 'X3 over current on +24V out', 'listnumber': '75' },
        { 'value': '12', 'name': 'X4 over current on +24V out ', 'listnumber': '76' },
        { 'value': '13', 'name': 'DI over current on +24V out', 'listnumber': '77' },
        { 'value': '14', 'name': 'Digital output driver overheat warning', 'listnumber': '78' },
        { 'value': '15', 'name': 'DI digital output 1 over current warning', 'listnumber': '79' },
        { 'value': '16', 'name': 'DI digital output 2 over current warning ', 'listnumber': '80' },
        { 'value': '17', 'name': 'DI digital output 3 over current warning', 'listnumber': '81' },
        { 'value': '18', 'name': 'DI digital output 4 over current warning', 'listnumber': '82' },
        { 'value': '19', 'name': 'DO digital output 5 over current warning', 'listnumber': '83' },
        { 'value': '20', 'name': 'DO digital output 6 over current warning', 'listnumber': '84' },
        { 'value': '21', 'name': 'DO digital output 7 over current warning', 'listnumber': '85' },
        { 'value': '22', 'name': 'DO digital output 8 over current warning', 'listnumber': '86' },
        { 'value': '23', 'name': 'Pump voltage in too high warning', 'listnumber': '87' },
        { 'value': '24', 'name': 'Pump voltage in too low warning', 'listnumber': '88' },
        { 'value': '25', 'name': 'I/O voltage in too high warning', 'listnumber': '89' },
        { 'value': '26', 'name': 'I/O voltage in too low warning', 'listnumber': '90' },
        { 'value': '27', 'name': 'Control voltage in too high warning', 'listnumber': '91' },
        { 'value': '28', 'name': 'Control voltage in too low warning', 'listnumber': '92' },
        { 'value': '29', 'name': 'Pump driver temperature too high warning', 'listnumber': '93' },
        { 'value': '30', 'name': 'I/O driver temperature too high warning', 'listnumber': '94' },
        { 'value': '31', 'name': 'Control temperature too high warning', 'listnumber': '95' },
      ],
      'TempWarnings': [
        { 'value': '1', 'name': 'Analog 1 min warn temp', 'listnumber': '33' },
        { 'value': '2', 'name': 'Analog 2 min warn temp', 'listnumber': '34' },
        { 'value': '3', 'name': 'Analog 3 min warn temp', 'listnumber': '35' },
        { 'value': '4', 'name': 'Analog 4 min warn temp', 'listnumber': '36' },
        { 'value': '5', 'name': 'Analog 5 min warn temp', 'listnumber': '37' },
        { 'value': '6', 'name': 'Analog 6 min warn temp', 'listnumber': '38' },
        { 'value': '7', 'name': 'Undefined', 'listnumber': '39' },
        { 'value': '8', 'name': 'Undefined', 'listnumber': '40' },
        { 'value': '9', 'name': 'Analog 1 max warn temp', 'listnumber': '41' },
        { 'value': '10', 'name': 'Analog 2 max warn temp', 'listnumber': '42' },
        { 'value': '11', 'name': 'Analog 3 max warn temp', 'listnumber': '43' },
        { 'value': '12', 'name': 'Analog 4 max warn temp', 'listnumber': '44' },
        { 'value': '13', 'name': 'Analog 5 max warn temp', 'listnumber': '45' },
        { 'value': '14', 'name': 'Analog 6 max warn temp', 'listnumber': '46' },
        { 'value': '15', 'name': 'Undefined', 'listnumber': '47' },
        { 'value': '16', 'name': 'Undefined', 'listnumber': '48' },
        { 'value': '17', 'name': 'X1 digital input 1 temp warn', 'listnumber': '49' },
        { 'value': '18', 'name': 'X2 digital input 2 temp warn', 'listnumber': '50' },
        { 'value': '19', 'name': 'X3 digital input 3 temp warn', 'listnumber': '51' },
        { 'value': '20', 'name': 'X4 digital input 4 temp warn', 'listnumber': '52' },
        { 'value': '21', 'name': 'DI digital I/O 1 warn temp', 'listnumber': '53' },
        { 'value': '22', 'name': 'DI digital I/O 2 warn temp', 'listnumber': '54' },
        { 'value': '23', 'name': 'DI digital I/O 3 warn temp', 'listnumber': '55' },
        { 'value': '24', 'name': 'DI digital I/O 4 warn temp', 'listnumber': '56' },
        { 'value': '25', 'name': 'DO digital I/O 5 warn temp', 'listnumber': '57' },
        { 'value': '26', 'name': 'DO digital I/O 6 warn temp', 'listnumber': '58' },
        { 'value': '28', 'name': 'DO digital I/O 7 warn temp', 'listnumber': '59' },
        { 'value': '29', 'name': 'DO digital I/O 8 warn temp', 'listnumber': '60' },
        { 'value': '30', 'name': 'Undefined', 'listnumber': '61' },
        { 'value': '31', 'name': 'Undefined', 'listnumber': '62' },
        { 'value': '32', 'name': 'PT100 min warn temp', 'listnumber': '63' },
        { 'value': '33', 'name': 'PT100 max warn temp', 'listnumber': '64' },
      ], 'AlarmsLog': [
        { 'value': '1', 'name': 'Analog 1 min alarm', 'listnumber': '33' },
        { 'value': '2', 'name': 'Analog 2 min alarm', 'listnumber': '34' },
        { 'value': '3', 'name': 'Analog 3 min alarm', 'listnumber': '35' },
        { 'value': '4', 'name': 'Analog 4 min alarm', 'listnumber': '36' },
        { 'value': '5', 'name': 'Analog 5 min alarm', 'listnumber': '37' },
        { 'value': '6', 'name': 'Analog 6 min alarm', 'listnumber': '38' },
        { 'value': '7', 'name': 'Undefined', 'listnumber': '39' },
        { 'value': '8', 'name': 'Undefined', 'listnumber': '40' },
        { 'value': '9', 'name': 'Analog 1 max alarm', 'listnumber': '41' },
        { 'value': '10', 'name': 'Analog 2 max alarm', 'listnumber': '42' },
        { 'value': '11', 'name': 'Analog 3 max alarm', 'listnumber': '43' },
        { 'value': '12', 'name': 'Analog 4 max alarm', 'listnumber': '44' },
        { 'value': '13', 'name': 'Analog 5 max alarm', 'listnumber': '45' },
        { 'value': '14', 'name': 'Analog 6 max alarm', 'listnumber': '46' },
        { 'value': '15', 'name': 'Undefined', 'listnumber': '47' },
        { 'value': '16', 'name': 'Undefined', 'listnumber': '48' },
        { 'value': '17', 'name': 'X1 digital 1 alarm', 'listnumber': '49' },
        { 'value': '18', 'name': 'X2 digital 2 alarm', 'listnumber': '50' },
        { 'value': '19', 'name': 'X3 digital 3 alarm', 'listnumber': '51' },
        { 'value': '20', 'name': 'X4 digital 4 alarm', 'listnumber': '52' },
        { 'value': '21', 'name': 'DI digital 1 I/O alarm', 'listnumber': '53' },
        { 'value': '22', 'name': 'DI digital 2 I/O alarm', 'listnumber': '54' },
        { 'value': '23', 'name': 'DI digital 3 I/O alarm', 'listnumber': '55' },
        { 'value': '24', 'name': 'DI digital 4 I/O alarm', 'listnumber': '56' },
        { 'value': '25', 'name': 'DO digital 1 I/O alarm', 'listnumber': '57' },
        { 'value': '26', 'name': 'DO digital 2 I/O alarm', 'listnumber': '58' },
        { 'value': '27', 'name': 'DO digital 3 I/O alarm', 'listnumber': '59' },
        { 'value': '28', 'name': 'DO digital 4 I/O alarm', 'listnumber': '60' },
        { 'value': '29', 'name': 'Undefined', 'listnumber': '61' },
        { 'value': '30', 'name': 'Setpoint singal outside limits', 'listnumber': '62' },
        { 'value': '31', 'name': 'PT100 min alarm', 'listnumber': '63' },
        { 'value': '32', 'name': 'PT100 max alarm', 'listnumber': '64' },
      ],
      'AlarmsLogExtended': [
        { 'value': '1', 'name': 'Pump power too high log', 'listnumber': '65' },
        { 'value': '2', 'name': 'I/O power too high log', 'listnumber': '66' },
        { 'value': '3', 'name': 'Pump driver temp too high log', 'listnumber': '67' },
        { 'value': '4', 'name': 'Pump driver temp too low log', 'listnumber': '68' },
        { 'value': '5', 'name': 'I/O temp too high log', 'listnumber': '69' },
        { 'value': '6', 'name': 'I/O temp too low log', 'listnumber': '70' },
        { 'value': '7', 'name': 'undefined', 'listnumber': '71' },
        { 'value': '8', 'name': 'Control temp too low log', 'listnumber': '72' },
        { 'value': '9', 'name': 'Pump driver over heated log', 'listnumber': '73' },
        { 'value': '10', 'name': 'EEPROM commmunication error log', 'listnumber': '74' },
        { 'value': '11', 'name': 'EEPROM memory data loss error log', 'listnumber': '75' },
      ],
      'HardwareAlarmsLog': [
        { 'value': '1', 'name': 'Bridge error', 'listnumber': '1' },
        { 'value': '2', 'name': 'Undefined', 'listnumber': '2' },
        { 'value': '3', 'name': 'Undefined', 'listnumber': '3' },
        { 'value': '4', 'name': 'Flash memory error', 'listnumber': '4' },
        { 'value': '5', 'name': 'Pump coil current error', 'listnumber': '5' },
        { 'value': '6', 'name': 'Pump coil output short circuit', 'listnumber': '6' },
        { 'value': '7', 'name': 'Undefined', 'listnumber': '7' },
        { 'value': '8', 'name': 'Pump coil driver error', 'listnumber': '8' },
        { 'value': '9', 'name': 'Pump coil open circuit', 'listnumber': '9' },
        { 'value': '10', 'name': 'No swash angle input selected', 'listnumber': '10' },
        { 'value': '11', 'name': 'No swash angle regulator enable selected', 'listnumber': '11' },
        { 'value': '12', 'name': 'No work pressure input selected', 'listnumber': '12' },
        { 'value': '13', 'name': 'No pressure regulator enable selected', 'listnumber': '13' },
        { 'value': '14', 'name': 'Undefined', 'listnumber': '14' },
        { 'value': '15', 'name': 'X1 digital input 1 monitor lost', 'listnumber': '15' },
        { 'value': '16', 'name': 'X2 digital input 2 monitor lost', 'listnumber': '16' },
        { 'value': '17', 'name': 'X3 digital input 3 monitor lost', 'listnumber': '17' },
        { 'value': '18', 'name': 'X4 digital input 4 monitor lost', 'listnumber': '18' },
        { 'value': '19', 'name': 'DI digital input I/O 1 monitor lost', 'listnumber': '19' },
        { 'value': '20', 'name': 'DI digital input I/O 2 monitor lost', 'listnumber': '20' },
        { 'value': '21', 'name': 'DI digital input I/O 3 monitor lost', 'listnumber': '21' },
        { 'value': '22', 'name': 'DI digital input I/O 4 monitor lost', 'listnumber': '22' },
        { 'value': '23', 'name': 'DO digital input I/O 1 monitor lost', 'listnumber': '23' },
        { 'value': '24', 'name': 'DO digital input I/O 2 monitor lost', 'listnumber': '24' },
        { 'value': '25', 'name': 'DO digital input I/O 3 monitor lost', 'listnumber': '25' },
        { 'value': '26', 'name': 'DO digital input I/O 4 monitor lost', 'listnumber': '26' },
        { 'value': '27', 'name': 'Pump power too low', 'listnumber': '27' },
        { 'value': '28', 'name': 'I/O power too low', 'listnumber': '28' },
        { 'value': '29', 'name': 'Control power too', 'listnumber': '29' },
        { 'value': '30', 'name': 'Control power high', 'listnumber': '30' },
        { 'value': '31', 'name': 'MCU temperature too high', 'listnumber': '31' },
        { 'value': '32', 'name': 'Undefined', 'listnumber': '32' }

      ],
      'WarningsLog': [
        { 'value': '1', 'name': 'Analog 1 min warn log', 'listnumber': '1' },
        { 'value': '2', 'name': 'Analog 2 min warn log', 'listnumber': '2' },
        { 'value': '3', 'name': 'Analog 3 min warn log', 'listnumber': '3' },
        { 'value': '4', 'name': 'Analog 4 min warn log', 'listnumber': '4' },
        { 'value': '5', 'name': 'Analog 5 min warn log', 'listnumber': '5' },
        { 'value': '6', 'name': 'Analog 6 min warn log', 'listnumber': '6' },
        { 'value': '7', 'name': 'No configuration found in memory log', 'listnumber': '7' },
        { 'value': '8', 'name': 'Password has not been changed from factory setting log', 'listnumber': '8' },
        { 'value': '9', 'name': 'Analog 1 max warn log', 'listnumber': '9' },
        { 'value': '10', 'name': 'Analog 2 max warn log', 'listnumber': '10' },
        { 'value': '11', 'name': 'Analog 3 max warn log', 'listnumber': '11' },
        { 'value': '12', 'name': 'Analog 4 max warn log', 'listnumber': '12' },
        { 'value': '13', 'name': 'Analog 5 max warn log', 'listnumber': '13' },
        { 'value': '14', 'name': 'Analog 6 max warn log', 'listnumber': '14' },
        { 'value': '15', 'name': 'Undefined', 'listnumber': '15' },
        { 'value': '16', 'name': 'Undefined', 'listnumber': '16' },
        { 'value': '17', 'name': 'X1 digital 1 warn log', 'listnumber': '17' },
        { 'value': '18', 'name': 'X2 digital 2 warn log', 'listnumber': '18' },
        { 'value': '19', 'name': 'X3 digital 3 warn log', 'listnumber': '19' },
        { 'value': '20', 'name': 'X4 digital 4 warn log', 'listnumber': '20' },
        { 'value': '21', 'name': 'DI digital I/O 1 warn log', 'listnumber': '21' },
        { 'value': '22', 'name': 'DI digital I/O 2 warn log', 'listnumber': '22' },
        { 'value': '23', 'name': 'DI digital I/O 3 warn log', 'listnumber': '23' },
        { 'value': '24', 'name': 'DI digital I/O 4 warn log', 'listnumber': '24' },
        { 'value': '25', 'name': 'DO digital I/O 1 warn log', 'listnumber': '25' },
        { 'value': '26', 'name': 'DO digital I/O 2 warn log', 'listnumber': '26' },
        { 'value': '27', 'name': 'DO digital I/O 3 warn log', 'listnumber': '27' },
        { 'value': '28', 'name': 'DO digital I/O 4 warn log', 'listnumber': '28' },
        { 'value': '29', 'name': 'Swash angle input has a bad signal level log', 'listnumber': '29' },
        { 'value': '30', 'name': 'Error too high for swash angle regulation log', 'listnumber': '30' },
        { 'value': '31', 'name': 'Work pressure input has a bad signal level log', 'listnumber': '31' },
        { 'value': '32', 'name': 'Error too high for pressure regulation log', 'listnumber': '32' },
      ],
      'WarningsExtendedLog': [
        { 'value': '1', 'name': 'AI Analog input 1 bad signal level warning log', 'listnumber': '65' },
        { 'value': '2', 'name': 'AI Analog input 2 bad signal level warning log', 'listnumber': '66' },
        { 'value': '3', 'name': 'X1 Analog input 3 bad signal level warning log', 'listnumber': '67' },
        { 'value': '4', 'name': 'X2 Analog input 4 bad signal level warning log', 'listnumber': '68' },
        { 'value': '5', 'name': 'X3 Analog input 5 bad signal level warning log', 'listnumber': '69' },
        { 'value': '6', 'name': 'X4 Analog input 6 bad signal level warning log', 'listnumber': '70' },
        { 'value': '7', 'name': 'PT100 bad signal level warning log', 'listnumber': '71' },
        { 'value': '8', 'name': 'Al over current on +24V out log', 'listnumber': '72' },
        { 'value': '9', 'name': 'X1 over current on +24V out log', 'listnumber': '73' },
        { 'value': '10', 'name': 'X2 over current on +24V out log', 'listnumber': '74' },
        { 'value': '11', 'name': 'X3 over current on +24V out log', 'listnumber': '75' },
        { 'value': '12', 'name': 'X4 over current on +24V out log ', 'listnumber': '76' },
        { 'value': '13', 'name': 'DI over current on +24V out log', 'listnumber': '77' },
        { 'value': '14', 'name': 'Digital output driver overheat warning log', 'listnumber': '78' },
        { 'value': '15', 'name': 'DI digital output 1 over current warning log', 'listnumber': '79' },
        { 'value': '16', 'name': 'DI digital output 2 over current warning log', 'listnumber': '80' },
        { 'value': '17', 'name': 'DI digital output 3 over current warning log', 'listnumber': '81' },
        { 'value': '18', 'name': 'DI digital output 4 over current warning log', 'listnumber': '82' },
        { 'value': '19', 'name': 'DO digital output 5 over current warning log', 'listnumber': '83' },
        { 'value': '20', 'name': 'DO digital output 6 over current warning log', 'listnumber': '84' },
        { 'value': '21', 'name': 'DO digital output 7 over current warning log', 'listnumber': '85' },
        { 'value': '22', 'name': 'DO digital output 8 over current warning log', 'listnumber': '86' },
        { 'value': '23', 'name': 'Pump voltage in too high warning log', 'listnumber': '87' },
        { 'value': '24', 'name': 'Pump voltage in too low warning log', 'listnumber': '88' },
        { 'value': '25', 'name': 'I/O voltage in too high warning log', 'listnumber': '89' },
        { 'value': '26', 'name': 'I/O voltage in too low warning log', 'listnumber': '90' },
        { 'value': '27', 'name': 'Control voltage in too high warning log', 'listnumber': '91' },
        { 'value': '28', 'name': 'Control voltage in too low warning log', 'listnumber': '92' },
        { 'value': '29', 'name': 'Pump driver temperature too high warning log', 'listnumber': '93' },
        { 'value': '30', 'name': 'I/O driver temperature too high warning log', 'listnumber': '94' },
        { 'value': '31', 'name': 'Control temperature too high warning log', 'listnumber': '95' },
      ],
      'TempWarningsLog': [
        { 'value': '1', 'name': 'Analog 1 min warn temp log', 'listnumber': '33' },
        { 'value': '2', 'name': 'Analog 2 min warn temp log', 'listnumber': '34' },
        { 'value': '3', 'name': 'Analog 3 min warn temp log', 'listnumber': '35' },
        { 'value': '4', 'name': 'Analog 4 min warn temp log', 'listnumber': '36' },
        { 'value': '5', 'name': 'Analog 5 min warn temp log', 'listnumber': '37' },
        { 'value': '6', 'name': 'Analog 6 min warn temp log', 'listnumber': '38' },
        { 'value': '7', 'name': 'Undefined', 'listnumber': '39' },
        { 'value': '8', 'name': 'Undefined', 'listnumber': '40' },
        { 'value': '9', 'name': 'Analog 1 max warn temp log', 'listnumber': '41' },
        { 'value': '10', 'name': 'Analog 2 max warn temp log', 'listnumber': '42' },
        { 'value': '11', 'name': 'Analog 3 max warn temp log', 'listnumber': '43' },
        { 'value': '12', 'name': 'Analog 4 max warn temp log', 'listnumber': '44' },
        { 'value': '13', 'name': 'Analog 5 max warn temp log', 'listnumber': '45' },
        { 'value': '14', 'name': 'Analog 6 max warn temp log', 'listnumber': '46' },
        { 'value': '15', 'name': 'Undefined', 'listnumber': '47' },
        { 'value': '16', 'name': 'Undefined', 'listnumber': '48' },
        { 'value': '17', 'name': 'X1 digital input 1 temp warn log', 'listnumber': '49' },
        { 'value': '18', 'name': 'X2 digital input 2 temp warn log', 'listnumber': '50' },
        { 'value': '19', 'name': 'X3 digital input 3 temp warn log', 'listnumber': '51' },
        { 'value': '20', 'name': 'X4 digital input 4 temp warn log', 'listnumber': '52' },
        { 'value': '21', 'name': 'DI digital I/O 1 warn temp log', 'listnumber': '53' },
        { 'value': '22', 'name': 'DI digital I/O 2 warn temp log', 'listnumber': '54' },
        { 'value': '23', 'name': 'DI digital I/O 3 warn temp log', 'listnumber': '55' },
        { 'value': '24', 'name': 'DI digital I/O 4 warn temp log', 'listnumber': '56' },
        { 'value': '25', 'name': 'DO digital I/O 5 warn temp log', 'listnumber': '57' },
        { 'value': '26', 'name': 'DO digital I/O 6 warn temp log', 'listnumber': '58' },
        { 'value': '28', 'name': 'DO digital I/O 7 warn temp log', 'listnumber': '59' },
        { 'value': '29', 'name': 'DO digital I/O 8 warn temp log', 'listnumber': '60' },
        { 'value': '30', 'name': 'Undefined', 'listnumber': '61' },
        { 'value': '31', 'name': 'Undefined', 'listnumber': '62' },
        { 'value': '32', 'name': 'PT100 min warn temp log', 'listnumber': '63' },
        { 'value': '33', 'name': 'PT100 max warn temp log', 'listnumber': '64' },
      ]
    }
    if (alarmType == Constants.values.Alarms) {
      return alarmsListMap.Alarms;
    } 
    else if (alarmType == Constants.values.HardwareAlarms) {
      return alarmsListMap.HardwareAlarms;
    } 
    else if (alarmType == Constants.values.Warnings) {
      return alarmsListMap.Warnings;
    } 
    else if (alarmType == Constants.values.TempWarnings) {
      return alarmsListMap.TempWarnings;
    } 
    else if (alarmType == Constants.values.AlarmsLog) {
      return alarmsListMap.AlarmsLog;
    } 
    else if (alarmType == Constants.values.HardwareAlarmsLog) {
      return alarmsListMap.HardwareAlarmsLog;
    } 
    else if (alarmType == Constants.values.WarningsLog) {
      return alarmsListMap.WarningsLog;
    } 
    else if (alarmType == Constants.values.TempWarningsLog) {
      return alarmsListMap.TempWarningsLog;
    } 
    else if (alarmType == Constants.values.AlarmsExtended) {
      return alarmsListMap.AlarmsExtended;
    }
    else if(alarmType == Constants.values.AlarmsExtendedLog) {
      return alarmsListMap.AlarmsLogExtended;
    }
    else if (alarmType == Constants.values.WarningsExtended){
      return alarmsListMap.WarningsExtended;
    }
    else if(alarmType == Constants.values.WarningsExtendedLog){
      return alarmsListMap.WarningsExtendedLog;
    }
  }

  licensePageItems = {

    "items": [{
      "name": "Apache license 2.0",
      "childItems": [{
        "name": "Android SDK Support Libraries",
        "version": "Unspecified",
        "link": "https://developer.android.com/tools/support-library/index.html"
      },
      {
        "name": "android-debug",
        "version": "Unspecified",
        "link": "https://github.com/vladotesanovic/a2cardboard"
      },
      {
        "name": "cordova-android",
        "version": "5.0.0",
        "link": "http://github.com/apache/cordova-android/"
      },
      {
        "name": "cordova-common",
        "version": "1.5.1",
        "link": "https://www.npmjs.org/package/cordova-common"
      },
      {
        "name": "cordova-email-composer",
        "version": "Unspecified",
        "link": "https://github.com/katzer/cordova-plugin-email-composer"
      },
      {
        "name": "cordova-lib",
        "version": "Unspecified",
        "link": "https://github.com/apache/cordova-lib"
      },
      {
        "name": "cordova-plugin-ble-central",
        "version": "1.2.2",
        "link": "https://www.npmjs.org/package/cordova-plugin-ble-central"
      },
      {
        "name": "cordova-plugin-compat",
        "version": "1.2.0",
        "link": "https://www.npmjs.org/package/cordova-plugin-compat"
      },
      {
        "name": "cordova-plugin-console",
        "version": "1.0.5",
        "link": "https://www.npmjs.org/package/cordova-plugin-console"
      },
      {
        "name": "cordova-plugin-device",
        "version": "2.0.2",
        "link": "http://github.com/apache/cordova-plugin-device/"
      },
      {
        "name": "cordova-plugin-file",
        "version": "6.0.1",
        "link": "https://www.npmjs.org/package/cordova-plugin-file"
      },
      {
        "name": "cordova-plugin-filechooser",
        "version": "1.0.1",
        "link": "https://github.com/don/cordova-filechooser"
      },
      {
        "name": "cordova-plugin-filepath",
        "version": "1.4.2",
        "link": "https://www.npmjs.org/package/cordova-plugin-filepath"
      },
      {
        "name": "cordova-plugin-splashscreen",
        "version": "5.0.2",
        "link": "http://github.com/apache/cordova-plugin-splashscreen/"
      },
      {
        "name": "cordova-plugin-statusbar",
        "version": "2.4.2",
        "link": "https://www.npmjs.org/package/cordova-plugin-statusbar"
      },
      {
        "name": "cordova-plugin-whitelist",
        "version": "1.3.3",
        "link": "https://www.npmjs.org/package/cordova-plugin-whitelist"
      },
      {
        "name": "cordova-plugin-itunesfilesharing",
        "version": "0.0.2",
        "link": "https://www.npmjs.org/package/cordova-plugin-itunesfilesharing"
      },
      {
        "name": "cordova-registry-mapper",
        "version": "1.1.15",
        "link": "https://www.npmjs.org/package/cordova-registry-mapper"
      },
      {
        "name": "Gradle Wrapper",
        "version": "Unspecified",
        "link": "https://docs.gradle.org/current/userguide/gradle_wrapper.html"
      },
      {
        "name": "ionic-plugin-keyboard",
        "version": "2.2.1",
        "link": "https://www.npmjs.org/package/ionic-plugin-keyboard"
      },
      {
        "name": "localforage",
        "version": "1.4.3",
        "link": "https://github.com/localForage/localForage/tree/1.4.3"
      },
      {
        "name": "node-elementtree",
        "version": "0.1.6",
        "link": "https://www.npmjs.org/package/elementtree"
      },
      {
        "name": "sw-toolbox",
        "version": "3.4.0",
        "link": "https://www.npmjs.org/package/sw-toolbox"
      },
      {
        "name": "xenious-cordova-plugin-whitelist",
        "version": "1.3.1",
        "link": "https://www.npmjs.org/package/xenious-cordova-plugin-whitelist"
      }
      ]
    },
    {
      "name": "BSD (three clause license)",
      "childItems": [{
        "name": "shelljs",
        "version": "0.5.3",
        "link": "https://www.npmjs.org/package/shelljs"
      }]
    },
    {
      "name": "BSD (two clause license)",
      "childItems": [{
        "name": "osenv",
        "version": "0.1.4",
        "link": "http://github.com/isaacs/osenv/"
      }]
    },
    {
      "name": "ISC license",
      "childItems": [{
        "name": "inflight",
        "version": "1.0.6",
        "link": "https://www.npmjs.org/package/inflight"
      },
      {
        "name": "inherits",
        "version": "2.0.3",
        "link": "http://github.com/isaacs/inherits/"
      },
      {
        "name": "minimatch",
        "version": "3.0.3",
        "link": "http://github.com/isaacs/minimatch/"
      },
      {
        "name": "molpay-mobile-xdk-cordova",
        "version": "1.4.0",
        "link": "https://www.npmjs.org/package/molpay-mobile-xdk-cordova"
      },
      {
        "name": "node-glob",
        "version": "7.1.1",
        "link": "http://github.com/isaacs/node-glob/"
      },
      {
        "name": "node-semver",
        "version": "5.3.0",
        "link": "http://github.com/isaacs/node-semver/"
      },
      {
        "name": "nopt",
        "version": "3.0.6",
        "link": "https://www.npmjs.org/package/nopt"
      },
      {
        "name": "wrappy",
        "version": "1.0.2",
        "link": "https://www.npmjs.org/package/wrappy"
      }

      ]
    },
    {
      "name": "MIT license",
      "childItems": [{
        "name": "abbrev-js",
        "version": "1.0.9",
        "link": "https://www.npmjs.org/package/abbrev"
      },
      {
        "name": "angular io",
        "version": "4.0.0",
        "link": "https://angular.io"
      },
      {
        "name": "ansi.js",
        "version": "0.3.1",
        "link": "https://www.npmjs.org/package/ansi"
      },
      {
        "name": "balanced-match",
        "version": "0.4.2",
        "link": "https://www.npmjs.org/package/balanced-match"
      },
      {
        "name": "base64-arraybuffer",
        "version": "Unspecified",
        "link": "http://github.com/niklasvh/base64-arraybuffer/"
      },
      {
        "name": "beatgammit's base64-js",
        "version": "0.0.8",
        "link": "https://www.npmjs.org/package/base64-js"
      },
      {
        "name": "brace-expansion",
        "version": "1.1.6",
        "link": "http://github.com/juliangruber/brace-expansion/"
      },
      {
        "name": "cordova-plugin-file-opener2",
        "version": "Unspecified",
        "link": "https://www.npmjs.org/package/cordova-plugin-file-opener2"
      },
      {
        "name": "cordova-plugin-filepicker",
        "version": "Unspecified",
        "link": "https://www.npmjs.com/package/cordova-plugin-filepicker"
      },
      {
        "name": "ionicons",
        "version": "3.0.0",
        "link": "https://www.npmjs.org/package/ionicons"
      },
      {
        "name": "lodash",
        "version": "3.10.1",
        "link": "https://www.npmjs.org/package/lodash-es"
      },
      {
        "name": "ng2-img-map",
        "version": "0.1.2",
        "link": "https://github.com/jasonroyle/ng2-img-map/"
      },
      {
        "name": "node xmldom",
        "version": "0.1.27",
        "link": "https://www.npmjs.org/package/xmldom"
      },
      {
        "name": "node-bplist-parser",
        "version": "0.1.1",
        "link": "https://www.npmjs.org/package/bplist-parser"
      },
      {
        "name": "node-concat-map",
        "version": "0.0.1",
        "link": "http://github.com/substack/node-concat-map/"
      },
      {
        "name": "node-plist",
        "version": "1.2.0",
        "link": "https://www.npmjs.org/package/plist"
      },
      {
        "name": "node-properties-parser",
        "version": "0.2.3",
        "link": "https://www.npmjs.org/package/properties-parser"
      },
      {
        "name": "os-homedir",
        "version": "1.0.2",
        "link": "https://www.npmjs.org/package/os-homedir"
      },
      {
        "name": "os-tmpdir",
        "version": "1.0.2",
        "link": "https://www.npmjs.org/package/os-tmpdir"
      },
      {
        "name": "path-is-absolute",
        "version": "1.0.1",
        "link": "https://www.npmjs.org/package/path-is-absolute"
      },
      {
        "name": "Q in javascript",
        "version": "1.5.0",
        "link": "http://github.com/kriskowal/q/"
      },
      {
        "name": "sax-js",
        "version": "0.3.5",
        "link": "http://github.com/isaacs/sax-js/"
      },
      {
        "name": "underscore",
        "version": "1.8.3",
        "link": "http://github.com/documentcloud/underscore/"
      },
      {
        "name": "unorm",
        "version": "1.4.1",
        "link": "https://www.npmjs.org/package/unorm"
      },
      {
        "name": "util-deprecate",
        "version": "1.0.2",
        "link": "http://github.com/TooTallNate/util-deprecate/"
      },
      {
        "name": "xmlbuilder-js",
        "version": "4.0.0",
        "link": "https://www.npmjs.org/package/xmlbuilder"
      }

      ]
    },
    {
      "name": "The unlicense",
      "childItems": [{
        "name": "BigInteger.js",
        "version": "1.6.22",
        "link": "http://github.com/peterolson/BigInteger.js/"
      }]
    }
    ]
  }
}
