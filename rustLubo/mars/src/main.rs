use std::io;

fn mars_weight(weight: f32) -> f32 {
   weight * 3.711 / 9.81
}

fn main() {
   println!("Enter your weight in kg:");
   let mut input_weight = String::new();
   io::stdin().read_line(&mut input_weight).unwrap();

   let original_weight: f32 = input_weight.trim().parse().unwrap();
   let mut mars_weight: f32 = mars_weight(original_weight);
   mars_weight = mars_weight * 1000.0;
   println!("input Weight: {} Weight on Mars (g): {} {}", input_weight.trim(), mars_weight, "(g)");
}
