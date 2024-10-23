//
//  RelaunchModule.swift
//  ZeoDemo
//
//  Created by Krishnaveni M on 14/05/24.


import Foundation
//import InMobiCMP


@objc(RelaunchModule)
class RelaunchModule: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc func relaunchApp() {

  }


  @objc func displayGDPRConsentScreen() {
//    ChoiceCmp.shared.forceDisplayUI()
  }
}

