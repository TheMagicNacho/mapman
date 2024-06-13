// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::Deserialize;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Deserialize, Debug)]
struct Cartesian {
    x: f64,
    y: f64,
    z: f64,
}

impl Cartesian {
    fn new(x: f64, y: f64, z: f64) -> Self {
        Self { x, y, z }
    }
}

#[tauri::command]
fn transfer_cartesian(point: Cartesian ) -> String {
    // let p = Cartesian::new(point.x, point.y, point.z);
    println!("Received point: {:?}", point);
    // TODO : convert the cartesian point to degrees.
    // RE the Cesium API with how they turn cartesians into degrees.
    
    "Received point".to_string()
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![transfer_cartesian, greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
